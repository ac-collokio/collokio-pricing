
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Check, Plus, Minus, Calendar, Clock } from "lucide-react";
import { packages, tools, ANNUAL_DISCOUNT } from "@/data/pricingData";
import { Switch } from "@/components/ui/switch";

const PricingCalculator = () => {
  const [selectedPackage, setSelectedPackage] = useState(packages[0]);
  const [extraToolCounters, setExtraToolCounters] = useState<Record<string, number>>({});
  const [totalPrice, setTotalPrice] = useState(0);
  const [isAnnual, setIsAnnual] = useState(false);

  const calculatePrice = () => {
    let total = selectedPackage.price;
    
    tools.forEach(tool => {
      const extraAmount = extraToolCounters[tool.id] || 0;
      const toolPrice = selectedPackage.tool_prices[tool.id as keyof typeof selectedPackage.tool_prices];
      total += extraAmount * toolPrice;
    });

    if (isAnnual) {
      // Apply discount to monthly price when annual payment is selected
      total = total * (1 - ANNUAL_DISCOUNT);
    }

    return Math.round(total);
  };

  const calculateAnnualTotal = () => {
    const monthlyPrice = calculatePrice();
    return Math.round(monthlyPrice * 12);
  };

  useEffect(() => {
    setTotalPrice(calculatePrice());
  }, [selectedPackage, extraToolCounters, isAnnual]);

  useEffect(() => {
    const sendHeight = () => {
      const height = document.body.scrollHeight;
      window.parent.postMessage({ type: 'resize', height }, '*');
    };

    sendHeight();
    window.addEventListener('resize', sendHeight);
    
    setTimeout(sendHeight, 100);

    return () => window.removeEventListener('resize', sendHeight);
  }, []);

  const handlePackageSelect = (pkg: typeof packages[0]) => {
    setSelectedPackage(pkg);
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

        <div className="mb-6 flex justify-center items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-pricing-accent" />
              <span className={`text-sm font-medium ${!isAnnual ? "text-pricing-accent" : "text-gray-500"}`}>Pago Mensual</span>
            </div>
            
            <Switch 
              checked={isAnnual}
              onCheckedChange={setIsAnnual}
              className="data-[state=checked]:bg-pricing-accent"
            />
            
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-pricing-accent" />
              <span className={`text-sm font-medium ${isAnnual ? "text-pricing-accent" : "text-gray-500"}`}>
                Pago Anual
                <span className="ml-1 text-xs bg-pricing-accent text-white px-1.5 py-0.5 rounded-full">
                  -30%
                </span>
              </span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
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
                      <div className="text-2xl font-bold mb-4">
                        USD ${isAnnual ? Math.round(pkg.price * (1 - ANNUAL_DISCOUNT)) : pkg.price}
                        <span className="text-sm font-normal">/mes</span>
                      </div>
                      <div className="space-y-2">
                        <div className="text-sm">
                          ✓ {pkg.includes.video_interviews} Videoentrevistas
                        </div>
                        <div className="text-sm">
                          ✓ {pkg.includes.interview_flows} Flujos de Entrevistas
                        </div>
                        <div className="text-sm">
                          ✓ {pkg.includes.users}
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
                          {tool.id === 'video_interviews' && (
                            <div className="text-sm text-gray-600">
                              Incluidos en el paquete: {selectedPackage.includes.video_interviews}
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

          <div className="lg:col-span-1">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-pricing-accent text-white rounded-2xl p-6 text-center"
            >
              <div className="text-xl mb-2">Precio Total Estimado</div>
              <div className="text-5xl font-bold">
                USD ${totalPrice}
                <span className="text-sm font-normal block mt-1">/mes</span>
              </div>
              {isAnnual && (
                <div className="mt-3 text-sm bg-white bg-opacity-20 rounded-lg p-2">
                  Precio anual: USD ${calculateAnnualTotal()} 
                  <span className="block">(30% de descuento aplicado)</span>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PricingCalculator;
