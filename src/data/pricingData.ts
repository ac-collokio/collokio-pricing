
export const companySize = [
  { id: "small", name: "Pequeña", price: 90, description: "1-50 empleados" },
  { id: "medium", name: "Mediana", price: 170, description: "51-200 empleados" },
  { id: "large", name: "Grande", price: 300, description: "201-1000 empleados" },
  { id: "enterprise", name: "Enterprise", price: 500, description: "1000+ empleados" },
];

export const tools = [
  { 
    id: "ai_evaluations", 
    name: "Evaluaciones con Inteligencia Artificial", 
    price: 5,
    type: "counter",
    increment: 5,
    description: "Precio por evaluación" 
  },
  { 
    id: "video_interviews", 
    name: "Videoentrevistas", 
    price: 2.5,
    type: "counter",
    increment: 5,
    description: "Precio por entrevista" 
  },
  { 
    id: "multi_users", 
    name: "Gestión de Múltiples Usuarios", 
    type: "select",
    options: [
      { value: "1-3", name: "1-3 usuarios", price: 10 },
      { value: "4-10", name: "4-10 usuarios", price: 15 },
      { value: "10+", name: "10+ usuarios", price: 20 }
    ]
  },
  { 
    id: "priority_support", 
    name: "Soporte Prioritario", 
    price: 0,
    type: "checkbox" 
  },
  { 
    id: "custom_reports", 
    name: "Informes Personalizados", 
    price: 40,
    type: "checkbox" 
  },
];
