// interfaces/Icategory.ts   (أو أي اسم ملف بتستخدمه)

export interface ICategory {
  _id: string;
  name: string;
  slug: string;
  image: string;
  description?: string;           // ← مهم لو هتعرض وصف تحت الاسم
  productCount?: number;          // ← مهم جداً للكارد (عدد المنتجات)
  createdAt: string;
  updatedAt: string;
  __v?: number;                   // اختياري في الـ frontend
}

// لو الـ API بيرجع category واحدة
export interface CategoryResponse {
  status: string;                 // أفضل تضيف status
  data: ICategory;
}

// لو الـ API بيرجع ليستة من التصنيفات (أكثر استخداماً)
export interface CategoriesResponse {
  status: string;
  results?: number;
  data: ICategory[];              // array مش object واحد
}