export const packages = [
  {
    id: "basic",
    name: "Básico",
    price: 50,
    oldPrice: 90,
    description: "Ideal para empresas pequeñas",
    includes: {
      video_interviews: 50,
      users: "3 usuarios",
      priority_support: false,
      interview_flows: 2
    },
    tool_prices: {
      video_interviews: 5,
      extra_users: 2
    }
  },
  {
    id: "professional",
    name: "Profesional",
    price: 90,
    oldPrice: 170,
    description: "Para empresas en crecimiento",
    includes: {
      video_interviews: 250,
      users: "10 usuarios",
      priority_support: true,
      interview_flows: 5
    },
    tool_prices: {
      video_interviews: 3,
      extra_users: 1
    }
  },
  {
    id: "enterprise",
    name: "Enterprise",
    price: 200,
    oldPrice: 350,
    description: "Solución empresarial completa",
    includes: {
      video_interviews: 700,
      users: "Usuarios ilimitados",
      priority_support: true,
      custom_reports: true,
      interview_flows: 15
    },
    tool_prices: {
      video_interviews: 1,
      extra_users: 0
    }
  }
];

export const tools = [
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

export const ANNUAL_DISCOUNT = 0.1667; // 16.67% discount (2 months free) for annual payments
