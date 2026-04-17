import Link from "next/link";
import { getMyToken } from "@/utiles/getMyToken";

const API_BASE_URL =
  process.env.API_BASE_URL ??
  process.env.NEXT_PUBLIC_API_BASE_URL ??
  "https://ecommerce.routemisr.com/api";

type OrderItem = {
  _id: string;
  count: number;
  price: number;
  product?: {
    title?: string;
    imageCover?: string;
  };
};

type Order = {
  _id: string;
  createdAt: string;
  totalOrderPrice: number;
  paymentMethodType: string;
  isPaid: boolean;
  isDelivered: boolean;
  cartItems: OrderItem[];
  shippingAddress?: {
    city?: string;
    details?: string;
  };
};

async function getAllOrders() {
  const token = await getMyToken();
  if (!token || typeof token !== "string") {
    return { orders: [] as Order[], error: "unauthorized" as const };
  }

  const endpoints = [`${API_BASE_URL}/v2/orders`, `${API_BASE_URL}/v2/orders/user`];
  for (const endpoint of endpoints) {
    const res = await fetch(endpoint, {
      headers: { token },
      cache: "no-store",
    });

    if (!res.ok) {
      continue;
    }

    const data = await res.json();
    return { orders: (data?.data ?? []) as Order[], error: null };
  }

  return { orders: [] as Order[], error: "failed" as const };
}

function getBadgeClass(success: boolean) {
  return success
    ? "bg-emerald-100 text-emerald-700 border border-emerald-200"
    : "bg-amber-100 text-amber-700 border border-amber-200";
}

export default async function AllOrdersPage() {
  const { orders, error } = await getAllOrders();

  if (error === "unauthorized") {
    return (
      <section className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center">
          <h1 className="text-2xl font-bold text-slate-900">All Orders</h1>
          <p className="mt-3 text-slate-600">Please sign in to view your orders.</p>
          <Link
            href="/login"
            className="mt-6 inline-flex rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-700"
          >
            Go to Login
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-8">
        <p className="text-sm font-medium text-indigo-600">Your account</p>
        <h1 className="mt-1 text-3xl font-bold text-slate-900">All Orders</h1>
        <p className="mt-2 text-slate-600">
          {orders.length} order{orders.length !== 1 ? "s" : ""} found
        </p>
      </div>

      {error === "failed" ? (
        <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-red-700">
          We could not load your orders right now. Please try again later.
        </div>
      ) : orders.length === 0 ? (
        <div className="rounded-2xl border border-slate-200 bg-white p-10 text-center">
          <h2 className="text-xl font-semibold text-slate-900">No orders yet</h2>
          <p className="mt-2 text-slate-600">Once you place an order, it will appear here.</p>
          <Link
            href="/shop"
            className="mt-6 inline-flex rounded-lg border border-slate-300 px-5 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
          >
            Start Shopping
          </Link>
        </div>
      ) : (
        <div className="space-y-5">
          {orders.map((order) => (
            <article
              key={order._id}
              className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
            >
              <div className="flex flex-col gap-4 border-b border-slate-100 pb-4 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <p className="text-sm text-slate-500">Order ID</p>
                  <p className="mt-0.5 break-all font-mono text-sm text-slate-900">{order._id}</p>
                  <p className="mt-2 text-sm text-slate-500">
                    Placed on{" "}
                    {new Date(order.createdAt).toLocaleDateString("en-EG", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  <span className={`rounded-full px-3 py-1 text-xs font-semibold ${getBadgeClass(order.isPaid)}`}>
                    {order.isPaid ? "Paid" : "Pending payment"}
                  </span>
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${getBadgeClass(
                      order.isDelivered
                    )}`}
                  >
                    {order.isDelivered ? "Delivered" : "In delivery"}
                  </span>
                </div>
              </div>

              <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
                <div className="rounded-xl bg-slate-50 p-4">
                  <p className="text-xs uppercase tracking-wide text-slate-500">Total</p>
                  <p className="mt-1 text-lg font-semibold text-slate-900">
                    {order.totalOrderPrice} EGP
                  </p>
                </div>
                <div className="rounded-xl bg-slate-50 p-4">
                  <p className="text-xs uppercase tracking-wide text-slate-500">Payment</p>
                  <p className="mt-1 text-lg font-semibold capitalize text-slate-900">
                    {order.paymentMethodType}
                  </p>
                </div>
                <div className="rounded-xl bg-slate-50 p-4">
                  <p className="text-xs uppercase tracking-wide text-slate-500">Items</p>
                  <p className="mt-1 text-lg font-semibold text-slate-900">{order.cartItems.length}</p>
                </div>
              </div>

              {order.shippingAddress && (
                <p className="mt-4 text-sm text-slate-600">
                  Shipping to: {order.shippingAddress.details}, {order.shippingAddress.city}
                </p>
              )}

              <div className="mt-4 space-y-2">
                {order.cartItems.slice(0, 3).map((item) => (
                  <div
                    key={item._id}
                    className="flex items-center justify-between rounded-lg border border-slate-100 px-3 py-2 text-sm"
                  >
                    <p className="line-clamp-1 text-slate-700">
                      {item.product?.title ?? "Product"} x {item.count}
                    </p>
                    <p className="font-semibold text-slate-900">{item.price} EGP</p>
                  </div>
                ))}
                {order.cartItems.length > 3 && (
                  <p className="text-xs text-slate-500">
                    +{order.cartItems.length - 3} more item{order.cartItems.length - 3 !== 1 ? "s" : ""}
                  </p>
                )}
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
