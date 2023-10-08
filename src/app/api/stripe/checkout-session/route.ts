import { PLANS } from '@/config/stripe';
import { getSession } from '@/lib/auth';
import prisma from '@/lib/prisma';
import { getUserSubscriptionPlan, stripe } from '@/lib/stripe';

export async function POST() {
  const session = await getSession();
  if (!session) return { status: 401, body: { message: 'Unauthorized' } };
  const user = await prisma.user.findUnique({
    where: { id: session?.user.id },
  });
  const billing_url = `${process.env.NEXT_PUBLIC_SITE_URL}/agency/goi-dich-vu`;
  if (!user) return { status: 401, body: { message: 'Unauthorized' } };

  const subCriptionPlan = await getUserSubscriptionPlan();

  //handle if the user already has a subscription
  //it will be renew, and call invoice.payment_succeeded webhook
  if (subCriptionPlan && user.stripeCustomerId) {
    const stripeSession = await stripe.billingPortal.sessions.create({
      customer: user.stripeCustomerId,
      return_url: billing_url,
    });

    return new Response(JSON.stringify({ url: stripeSession.url }), {
      status: 200,
    });
  }

  //handle if the user doesn't have a subscription
  //it will be create a new subscription, and call checkout.session.completed webhook
  const stripeSession = await stripe.checkout.sessions.create({
    success_url: billing_url,
    cancel_url: billing_url,
    payment_method_types: ['card'],
    mode: 'subscription',
    billing_address_collection: 'auto',
    line_items: [
      {
        price: PLANS.find((plan) => plan.name === 'Pro')?.price.priceIds.test,
        quantity: 1,
      },
    ],
    metadata: {
      userId: user.id,
    },
  });
  return new Response(JSON.stringify({ url: stripeSession.url }), {
    status: 200,
  });
}
