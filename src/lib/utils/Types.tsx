export type ProductListProps = {
  products: Product[];
}

export type Product = {
  brand: string,
  product: string;
  repo: string,
  state: "active" | "inactive";
  owner: string;
}

export type brandLisType = string[];

export type CommentsListProps = {
  comments: string[];
};

export type ClipProps = {
  text: string;
}