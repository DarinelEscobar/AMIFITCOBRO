import { useState, useEffect, useRef, useCallback } from 'react';
import {
  startPayment,
  verifyPayment,
  cancelPayment as cancelPaymentApi
} from '../API/keyfobApi';

const COUNTDOWN   = 500;      // 5 min (30 seg. en pruebas)
const POLL_EVERY  = 5000;     // 5 seg.

export default function usePaymentFlow() {
  const [status,  setStatus]  = useState('idle');      // idle | loading | pending | success | timeout | cancelled | error
  const [seconds, setSeconds] = useState(COUNTDOWN);
  const [payment, setPayment] = useState(null);
  const [error,   setError]   = useState(null);

  const pollRef   = useRef(null);
  const timerRef  = useRef(null);
  const paymentRef = useRef(null);

  const clearTimers = () => {
    if (pollRef.current)  clearInterval(pollRef.current);
    if (timerRef.current) clearInterval(timerRef.current);
    pollRef.current = null;
    timerRef.current = null;
  };

  const internalCancel = async () => {
    if (paymentRef.current) {
      try { await cancelPaymentApi(paymentRef.current.registroId); } catch {}
    }
  };

  const beginPayment = useCallback(async payload => {
    setStatus('loading');
    setError(null);

    try {
      const { data } = await startPayment(payload);
      setPayment(data);
      paymentRef.current = data;
      setStatus('pending');
      setSeconds(COUNTDOWN);

      /* countdown */
      timerRef.current = setInterval(() => {
        setSeconds(prev => {
          if (prev <= 1) {
            clearTimers();
            internalCancel();                 // auto-cancel
            setStatus('timeout');
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      /* polling */
      pollRef.current = setInterval(async () => {
        try {
          await verifyPayment(data.registroId);
          clearTimers();
          setStatus('success');
        } catch {/* sigue en pending */}
      }, POLL_EVERY);
    } catch (e) {
      setError(e);
      setStatus('error');
    }
  }, []);

  const cancelPayment = useCallback(async () => {
    clearTimers();
    await internalCancel();
    setStatus('cancelled');
  }, []);

  useEffect(() => () => clearTimers(), []);

  return { status, seconds, payment, error, beginPayment, cancelPayment };
}
