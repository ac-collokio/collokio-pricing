
export const companySize = [
  { id: "small", name: "Pequeña", multiplier: 1, description: "1-50 empleados" },
  { id: "medium", name: "Mediana", multiplier: 1.5, description: "51-200 empleados" },
  { id: "large", name: "Grande", multiplier: 2, description: "201-1000 empleados" },
  { id: "enterprise", name: "Enterprise", multiplier: 2.5, description: "1000+ empleados" },
];

export const tools = [
  { 
    id: "ai_evaluations", 
    name: "Evaluaciones con Inteligencia Artificial", 
    price: 29,
    type: "counter",
    description: "Precio por evaluación" 
  },
  { 
    id: "video_interviews", 
    name: "Videoentrevistas", 
    price: 19,
    type: "counter",
    description: "Precio por entrevista" 
  },
  { 
    id: "multi_users", 
    name: "Gestión de Múltiples Usuarios", 
    price: 199,
    type: "checkbox" 
  },
  { 
    id: "priority_support", 
    name: "Soporte Prioritario", 
    price: 299,
    type: "checkbox" 
  },
  { 
    id: "custom_reports", 
    name: "Informes Personalizados", 
    price: 249,
    type: "checkbox" 
  },
];

export const BASE_PRICE = 499;
