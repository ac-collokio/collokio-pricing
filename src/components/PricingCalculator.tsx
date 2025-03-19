
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
    
    // Add extra evaluations, interviews, and users using package-specific prices
    tools.forEach(tool => {
      const extraAmount = extraToolCounters[tool.id] || 0;
      const toolPrice = selectedPackage.tool_prices[tool.id as keyof typeof selectedPackage.tool_prices];
      total += extraAmount * toolPrice;
    });

    return Math.round(total);
  };

  useEffect(() => {
    setTotalPrice(calculatePrice());
  }, [selectedPackage, extraToolCounters]);

  useEffect(() => {
    // Send height updates to parent window for iframe resizing
    const sendHeight = () => {
      const height = document.body.scrollHeight;
      window.parent.postMessage({ type: 'resize', height }, '*');
    };

    // Run once on load and whenever window resizes
    sendHeight();
    window.addEventListener('resize', sendHeight);
    
    // Run again after a short delay to account for any animations
    setTimeout(sendHeight, 100);

    return () => window.removeEventListener('resize', sendHeight);
  }, []);

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

  // Filter tools to hide extra_users for Enterprise package
  const displayTools = tools.filter(tool => {
    if (tool.id === "extra_users" && selectedPackage.id === "enterprise") {
      return false;
    }
    return true;
  });

  return (
    <div className="bg-pricing-light py-4 px-2 sm:px-4 lg:px-6 animate-fade-in">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-6">
          <img 
            src="/lovable-uploads/8cfbc446-6f60-451d-965e-d58163706d74.png"
            alt="Logo"
            className="h-10 sm:h-14 mx-auto mb-4"
          />
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Calculadora de Precios
          </h1>
          <p className="text-lg text-gray-600">
            Selecciona el paquete que mejor se adapte a tus necesidades
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
          {/* Contenido principal (3 columnas) */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-2xl shadow-xl p-4 sm:p-6">
              <div className="mb-6">
                <h2 className="text-xl font-semibold mb-4">Paquetes Disponibles</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {packages.map((pkg) => (
                    <button
                      key={pkg.id}
                      onClick={() => handlePackageSelect(pkg)}
                      className={`p-4 rounded-xl transition-all duration-200 text-left ${
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
                <h2 className="text-xl font-semibold mb-4">Extras</h2>
                <div className="grid grid-cols-1 gap-4">
                  {displayTools.map((tool) => (
                    <motion.div
                      key={tool.id}
                      whileHover={{ scale: 1.01 }}
                      className="p-4 rounded-xl border border-gray-200"
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium text-gray-900">{tool.name}</div>
                          <div className="text-sm text-gray-600">
                            USD ${selectedPackage.tool_prices[tool.id as keyof typeof selectedPackage.tool_prices]} {tool.description} {tool.increment > 1 ? `(paquetes de ${tool.increment})` : ''}
                          </div>
                          {tool.id !== 'extra_users' && (
                            <div className="text-sm text-gray-600">
                              Incluidos en el paquete: {
                                tool.id === 'video_interviews' 
                                  ? selectedPackage.includes.video_interviews 
                                  : selectedPackage.includes.ai_evaluations
                              }
                            </div>
                          )}
                          {tool.id === 'extra_users' && (
                            <div className="text-sm text-gray-600">
                              Incluidos en el paquete: {selectedPackage.includes.users}
                            </div>
                          )}
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
              className="bg-pricing-accent text-white rounded-2xl p-6 text-center"
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
