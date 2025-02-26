
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Check, Plus, Minus } from "lucide-react";
import { packages, tools } from "@/data/pricingData";

const PricingCalculator = () => {
  const [selectedPackage, setSelectedPackage] = useState(packages[0]);
  const [extraToolCounters, setExtraToolCounters] = useState<Record<string, number>>({});
  const [totalPrice, setTotalPrice] = useState(0);

  const calculatePrice = () => {
    // Base price from selected package
    let total = selectedPackage.price;
    
    // Add extra evaluations and interviews
    tools.forEach(tool => {
      const extraAmount = extraToolCounters[tool.id] || 0;
      total += extraAmount * tool.price;
    });

    return Math.round(total);
  };

  useEffect(() => {
    setTotalPrice(calculatePrice());
  }, [selectedPackage, extraToolCounters]);

  const handlePackageSelect = (pkg: typeof packages[0]) => {
    setSelectedPackage(pkg);
    // Reset extra counters when changing package
    setExtraToolCounters({});
  };

  const handleCounterChange = (toolId: string, increment: boolean) => {
    setExtraToolCounters((prev) => {
      const tool = tools.find(t => t.id === toolId);
      if (!tool || tool.type !== "counter") return prev;
      
      const currentValue = prev[toolId] || 0;
      const incrementValue = tool.increment || 1;
      const newValue = increment 
        ? currentValue + incrementValue 
        : Math.max(0, currentValue - incrementValue);
      
      return {
        ...prev,
        [toolId]: newValue
      };
    });
  };

  return (
    <div className="min-h-screen bg-pricing-light py-6 px-4 sm:px-6 lg:px-8 animate-fade-in relative">
      {/* Logo en la esquina superior izquierda */}
      <div className="absolute top-6 left-8">
        <img 
          src="/lovable-uploads/8cfbc446-6f60-451d-965e-d58163706d74.png"
          alt="Logo"
          className="h-10"
        />
      </div>

      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Calculadora de Precios
          </h1>
          <p className="text-lg text-gray-600">
            Selecciona el paquete que mejor se adapte a tus necesidades
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Contenido principal (3 columnas) */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <div className="mb-8">
                <h2 className="text-xl font-semibold mb-4">Paquetes Disponibles</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {packages.map((pkg) => (
                    <button
                      key={pkg.id}
                      onClick={() => handlePackageSelect(pkg)}
                      className={`p-6 rounded-xl transition-all duration-200 text-left ${
                        selectedPackage.id === pkg.id
                          ? "bg-pricing-accent text-white"
                          : "bg-gray-50 hover:bg-gray-100 text-gray-800"
                      }`}
                    >
                      <div className="font-bold text-lg mb-2">{pkg.name}</div>
                      <div className="text-sm mb-4 opacity-90">{pkg.description}</div>
                      <div className="text-2xl font-bold mb-4">USD ${pkg.price}/mes</div>
                      <div className="space-y-2">
                        <div className="text-sm">
                          ✓ {pkg.includes.video_interviews} Videoentrevistas
                        </div>
                        <div className="text-sm">
                          ✓ {pkg.includes.ai_evaluations} Evaluaciones con IA
                        </div>
                        <div className="text-sm">
                          ✓ {pkg.includes.users} usuarios
                        </div>
                        {pkg.includes.priority_support && (
                          <div className="text-sm">✓ Soporte Prioritario</div>
                        )}
                        {pkg.includes.custom_reports && (
                          <div className="text-sm">✓ Informes Personalizados</div>
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <h2 className="text-xl font-semibold mb-4">Extras Adicionales</h2>
                <div className="grid grid-cols-1 gap-4">
                  {tools.map((tool) => (
                    <motion.div
                      key={tool.id}
                      whileHover={{ scale: 1.01 }}
                      className="p-4 rounded-xl border border-gray-200"
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium text-gray-900">{tool.name}</div>
                          <div className="text-sm text-gray-600">
                            USD ${tool.price} {tool.description} (paquetes de {tool.increment})
                          </div>
                          <div className="text-sm text-gray-600">
                            Incluidos en el paquete: {
                              tool.id === 'video_interviews' 
                                ? selectedPackage.includes.video_interviews 
                                : selectedPackage.includes.ai_evaluations
                            }
                          </div>
                        </div>
                        <div className="flex items-center space-x-3">
                          <button
                            onClick={() => handleCounterChange(tool.id, false)}
                            className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100"
                          >
                            <Minus size={16} />
                          </button>
                          <span className="w-12 text-center font-medium">
                            {extraToolCounters[tool.id] || 0}
                          </span>
                          <button
                            onClick={() => handleCounterChange(tool.id, true)}
                            className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100"
                          >
                            <Plus size={16} />
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Panel de precio (1 columna) */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-pricing-accent text-white rounded-2xl p-8 text-center sticky top-6"
            >
              <div className="text-xl mb-2">Precio Total Estimado</div>
              <div className="text-5xl font-bold">USD ${totalPrice}/mes</div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PricingCalculator;
