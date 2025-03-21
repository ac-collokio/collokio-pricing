
export const packages = [
  {
    id: "basic",
    name: "Básico",
    price: 90,
    description: "Ideal para empresas pequeñas",
    includes: {
      video_interviews: 20,
      ai_evaluations: 20,
      users: "3 usuarios",
      priority_support: false
    },
    tool_prices: {
      ai_evaluations: 8,
      video_interviews: 4,
      extra_users: 2
    }
  },
  {
    id: "professional",
    name: "Profesional",
    price: 170,
    description: "Para empresas en crecimiento",
    includes: {
      video_interviews: 50,
      ai_evaluations: 50,
      users: "10 usuarios",
      priority_support: true
    },
    tool_prices: {
      ai_evaluations: 5,
      video_interviews: 2.5,
      extra_users: 1
    }
  },
  {
    id: "enterprise",
    name: "Enterprise",
    price: 300,
    description: "Solución empresarial completa",
    includes: {
      video_interviews: 100,
      ai_evaluations: 100,
      users: "Ilimitados",
      priority_support: true,
      custom_reports: true
    },
    tool_prices: {
      ai_evaluations: 2.5,
      video_interviews: 1,
      extra_users: 0
    }
  }
];

export const tools = [
  { 
    id: "ai_evaluations", 
    name: "Evaluaciones con Inteligencia Artificial", 
    type: "counter",
    increment: 5,
    description: "Precio por evaluación" 
  },
  { 
    id: "video_interviews", 
    name: "Videoentrevistas", 
    type: "counter",
    increment: 5,
    description: "Precio por entrevista" 
  },
  {
    id: "extra_users",
    name: "Usuarios adicionales",
    type: "counter",
    increment: 1,
    description: "Precio por usuario"
  }
];
