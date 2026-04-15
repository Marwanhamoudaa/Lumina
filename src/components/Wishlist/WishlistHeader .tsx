// components/Wishlist/WishlistHeader.tsx
export default function WishlistHeader() {
    return (
      <div className="hidden md:grid grid-cols-12 gap-4 px-6 py-4 bg-linear-to-r from-slate-50 to-slate-100/50 border-b border-slate-200 text-sm font-semibold text-slate-600">
        <div className="col-span-6">Product</div>
        <div className="col-span-2 text-center">Price</div>
        <div className="col-span-2 text-center">Status</div>
        <div className="col-span-2 text-center">Actions</div>
      </div>
    );
  }