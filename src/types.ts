export interface FenceDesign {
  material: 'wood' | 'metal' | 'vinyl';
  color: string;
  height: number;
  length: number;
  style: string;
  customizations: string[];
}

export interface Project {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  material: string;
  location: string;
  completionDate: string;
}

export interface QuoteRequest {
  name: string;
  email: string;
  phone: string;
  projectDescription: string;
  design?: FenceDesign;
}