export type BoxType = 'rigid_standard' | 'top_bottom_window' | 'magnetic_flap' | 'drawer_sleeve' | 'shoulder_neck' | 'kappa_sturdy';

export interface BoxConfig {
  type: BoxType;
  length: number; // in cm
  width: number;  // in cm
  height: number; // in cm
  quantity: number;
  outerPaper: string;
  finishType: string;
  insertType: string;
  logoOption: string;
  windowSize?: number; // optional, for top_bottom_window
}

export interface ProductItem {
  id: string;
  title: string;
  category: 'rigid' | 'kappa' | 'custom';
  description: string;
  badge: string;
  features: string[];
  specs: {
    material: string;
    thickness: string;
    moq: string;
    customization: string;
  };
  details: string;
  image?: string;
}

export interface LeadInquiry {
  id: string;
  name: string;
  companyName: string;
  phone: string;
  email: string;
  requirement: string;
  message: string;
  config?: BoxConfig;
  status: 'new' | 'contacted' | 'quoted' | 'completed';
  createdAt: string;
  sourceProduct?: string;
}

export interface ExcellenceStep {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  icon: string;
}

export interface IndustryCard {
  id: string;
  title: string;
  description: string;
  icon: string;
  bgGradient: string;
}
