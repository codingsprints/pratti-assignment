export interface Credentials {
  userName: string;
  email: string;
  password: string;
}

export interface LoginTypes {
  email: string;
  password: string;
}

export interface FormDataType {
  contentType:
    | "Blog Post"
    | "Instagram Caption"
    | "Email Newsletter"
    | "Product Description";
  topic: string;
  keywords?: string;
  tone: "Friendly" | "Professional" | "Casual";
  language: "English" | "Hindi" | "Marathi";
}
