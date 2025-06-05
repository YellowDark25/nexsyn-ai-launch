import React from "react";
import { ShieldCheck, Gift, Clock } from "lucide-react";
import { useCountdown } from "../hooks/useCountdown";
import { motion } from "framer-motion";

const OfferSection = () => {
  // Set a countdown for 7 days from now
  const targetDate = new Date();
  targetDate.setDate(targetDate.getDate() + 7);

  const { days, hours, minutes, seconds } = useCountdown(targetDate);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  const countdownVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  return (
    <section className="relative py-24 overflow-hidden bg-gradient-to-br from-[#0A1A3A] via-[#0F1B4D] to-[#1A1B51] text-white">
      {/* Efeitos de fundo */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-orange-500/5 via-transparent to-transparent opacity-70"></div>
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI5IiBoZWlnaHQ6IjkiPgo8cmVjdCB3aWR0aD0iOSIgaGVpZ2h0PSI5IiBmaWxsPSIjZmZmZmZmIiBvcGFjaXR5PSIwLjAxIj48L3JlY3Q+CjxwYXRoIGQ9Ik0wIDVMOSAwWk02IDRMNCA2Wk0tMSAxTDEgLTFaIiBzdHJva2U9IiNmZmZmZmYiIHN0cm9rZS13aWR0aD0iMC41IiBzdHJva2Utb3BhY2l0eT0iMC4wNSI+PC9wYXRoPgo8L3N2Zz4=')] opacity-20"></div>
      <div className="absolute inset-0 bg-gradient-to-r from-blue-900/20 via-transparent to-blue-900/10"></div>
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-orange-400/10 rounded-full mix-blend-screen blur-3xl"></div>
      <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-amber-400/10 rounded-full mix-blend-screen blur-3xl"></div>
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={containerVariants}
          className="text-center mb-12 space-y-4"
        >
          <motion.h2 variants={itemVariants} className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-orange-300 via-orange-400 to-amber-400">
            <span className="text-white">Oferta exclusiva</span> por tempo limitado
          </motion.h2>
          <motion.p variants={itemVariants} className="text-lg md:text-xl max-w-3xl mx-auto text-gray-300">
            Diagnóstico gratuito para transformar seu negócio com IA aplicada
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={containerVariants}
          className="bg-gradient-to-br from-gray-900/40 to-gray-800/40 backdrop-blur-sm rounded-2xl p-6 md:p-10 max-w-5xl mx-auto border border-gray-700/50 shadow-2xl"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
            {/* Benefit 1 */}
            <motion.div 
              variants={itemVariants} 
              className="flex flex-col items-center md:items-start text-center md:text-left p-6 rounded-xl hover:bg-white/5 transition-all duration-300 border border-gray-700/50 hover:border-orange-500/30 bg-gradient-to-br from-gray-900/30 to-gray-800/30 hover:from-gray-800/40 hover:to-gray-700/40"
              whileHover={{ y: -5, scale: 1.02 }}
            >
              <div className="bg-gradient-to-br from-orange-500/20 to-amber-500/20 rounded-full p-3 mb-4">
                <ShieldCheck size={28} className="text-orange-400" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-white">Garantia de valor</h3>
              <p className="text-gray-300 text-sm">
                Se não identificarmos pelo menos 3 oportunidades de melhoria com IA, o diagnóstico completo é gratuito.
              </p>
            </motion.div>

            {/* Benefit 2 */}
            <motion.div 
              variants={itemVariants} 
              className="flex flex-col items-center md:items-start text-center md:text-left p-6 rounded-xl hover:bg-white/5 transition-all duration-300 border border-gray-700/50 hover:border-orange-500/30 bg-gradient-to-br from-gray-900/30 to-gray-800/30 hover:from-gray-800/40 hover:to-gray-700/40"
              whileHover={{ y: -5, scale: 1.02 }}
            >
              <div className="bg-gradient-to-br from-orange-500/20 to-amber-500/20 rounded-full p-3 mb-4">
                <Gift size={28} className="text-amber-400" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-white">Bônus exclusivo</h3>
              <p className="text-gray-300 text-sm">
                Acesso ao nosso e-book "5 casos de uso de IA para aumentar lucros imediatamente" (valor: R$ 497).
              </p>
            </motion.div>

            {/* Benefit 3 */}
            <motion.div 
              variants={itemVariants} 
              className="flex flex-col items-center md:items-start text-center md:text-left p-6 rounded-xl hover:bg-white/5 transition-all duration-300 border border-gray-700/50 hover:border-orange-500/30 bg-gradient-to-br from-gray-900/30 to-gray-800/30 hover:from-gray-800/40 hover:to-gray-700/40"
              whileHover={{ y: -5, scale: 1.02 }}
            >
              <div className="bg-gradient-to-br from-orange-500/20 to-amber-500/20 rounded-full p-3 mb-4">
                <Clock size={28} className="text-orange-300" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-white">Entrega rápida</h3>
              <p className="text-gray-300 text-sm">
                Diagnóstico completo em até 3 dias úteis após a coleta de informações iniciais.
              </p>
            </motion.div>
          </div>

          <motion.div variants={countdownVariants} className="text-center mt-12">
            <h3 className="text-2xl md:text-3xl font-bold mb-8 text-white bg-clip-text text-transparent bg-gradient-to-r from-orange-300 to-amber-300">
              Esta oferta expira em:
            </h3>

            <div className="flex justify-center space-x-4 md:space-x-6 mb-10">
              <div className="flex flex-col items-center">
                <div className="bg-gradient-to-br from-gray-900/60 to-gray-800/60 rounded-lg w-16 h-16 md:w-20 md:h-20 flex items-center justify-center text-2xl md:text-4xl font-bold border border-gray-700/50 shadow-lg">
                  {days}
                </div>
                <span className="text-sm mt-2 text-gray-300">Dias</span>
              </div>

              <div className="flex flex-col items-center">
                <div className="bg-gradient-to-br from-gray-900/60 to-gray-800/60 rounded-lg w-16 h-16 md:w-20 md:h-20 flex items-center justify-center text-2xl md:text-4xl font-bold border border-gray-700/50 shadow-lg">
                  {hours}
                </div>
                <span className="text-sm mt-2 text-gray-300">Horas</span>
              </div>

              <div className="flex flex-col items-center">
                <div className="bg-gradient-to-br from-gray-900/60 to-gray-800/60 rounded-lg w-16 h-16 md:w-20 md:h-20 flex items-center justify-center text-2xl md:text-4xl font-bold border border-gray-700/50 shadow-lg">
                  {minutes}
                </div>
                <span className="text-sm mt-2 text-gray-300">Minutos</span>
              </div>

              <div className="flex flex-col items-center">
                <div className="bg-gradient-to-br from-gray-900/60 to-gray-800/60 rounded-lg w-16 h-16 md:w-20 md:h-20 flex items-center justify-center text-2xl md:text-4xl font-bold border border-gray-700/50 shadow-lg">
                  {seconds}
                </div>
                <span className="text-sm mt-2 text-gray-300">Segundos</span>
              </div>
            </div>

            <motion.a
              href="#contato"
              className="inline-flex items-center bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white px-10 py-4 rounded-xl font-semibold text-lg transition-all duration-300 hover:shadow-lg hover:shadow-orange-500/20"
              whileHover={{ scale: 1.05, boxShadow: '0 10px 25px -5px rgba(249, 115, 22, 0.3)' }}
              whileTap={{ scale: 0.98 }}
            >
              Quero meu diagnóstico gratuito
            </motion.a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default OfferSection;
