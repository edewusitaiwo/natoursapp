import axios from 'axios';
import { showAlert } from './alert';

const stripe = Stripe(
  'pk_test_51TrVOQIUh4nAwxM00q7cmlIZ0dK4ejpECA4flnEnwIpAJgLtp536tXIjbgwU0LzExW8nfXjrJE5ovg81tFsGRHKf00TISNWqWM',
);

export const bookTour = async (tourId) => {
  try {
    // 1) Get checkout session from API
    const session = await axios(`/api/v1/bookings/checkout-session/${tourId}`);

    // 2) Create a checkout form + chance credit card
    await stripe.redirectToCheckout({
      sessionId: session.data.session.id,
    });
  } catch (err) {
    showAlert('error', err);
  }
};
