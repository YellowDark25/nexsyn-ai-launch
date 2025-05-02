
import React from "react";
import { ShieldCheck, Gift, Clock } from "lucide-react";
import { useCountdown } from "../hooks/useCountdown";

const OfferSection = () => {
  // Set a countdown for 7 days from now
  const targetDate = new Date();
  targetDate.setDate(targetDate.getDate() + 7);

  const { days, hours, minutes, seconds } = useCountdown(targetDate);

  return (
    <section className="py-20 bg-nexblue text-white">
      <div className="container mx-auto px-4 md:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="text-nexlime">Oferta exclusiva</span> por tempo limitado
          </h2>
          <p className="text-lg md:text-xl max-w-3xl mx-auto opacity-90">
            Diagnóstico gratuito para transformar seu negócio com IA aplicada
          </p>
        </div>

        <div className="bg-nexblack/30 backdrop-blur-sm rounded-2xl p-6 md:p-10 max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            <div className="flex flex-col items-center md:items-start text-center md:text-left">
              <div className="bg-nexlime/20 rounded-full p-3 mb-4">
                <ShieldCheck size={28} className="text-nexlime" />
              </div>
              <h3 className="text-xl font-bold mb-2">Garantia de valor</h3>
              <p className="opacity-80">
                Se não identificarmos pelo menos 3 oportunidades de melhoria com IA, o diagnóstico completo é gratuito.
              </p>
            </div>

            <div className="flex flex-col items-center md:items-start text-center md:text-left">
              <div className="bg-nexlime/20 rounded-full p-3 mb-4">
                <Gift size={28} className="text-nexlime" />
              </div>
              <h3 className="text-xl font-bold mb-2">Bônus exclusivo</h3>
              <p className="opacity-80">
                Acesso ao nosso e-book "5 casos de uso de IA para aumentar lucros imediatamente" (valor: R$ 497).
              </p>
            </div>

            <div className="flex flex-col items-center md:items-start text-center md:text-left">
              <div className="bg-nexlime/20 rounded-full p-3 mb-4">
                <Clock size={28} className="text-nexlime" />
              </div>
              <h3 className="text-xl font-bold mb-2">Entrega rápida</h3>
              <p className="opacity-80">
                Diagnóstico completo em até 3 dias úteis após a coleta de informações iniciais.
              </p>
            </div>
          </div>

          <div className="text-center">
            <h3 className="text-2xl md:text-3xl font-bold mb-6">
              Esta oferta expira em:
            </h3>

            <div className="flex justify-center space-x-4 mb-8">
              <div className="flex flex-col items-center">
                <div className="bg-nexblack/60 rounded-lg w-16 h-16 flex items-center justify-center text-2xl font-bold">
                  {days}
                </div>
                <span className="text-sm mt-1 opacity-80">Dias</span>
              </div>
              
              <div className="flex flex-col items-center">
                <div className="bg-nexblack/60 rounded-lg w-16 h-16 flex items-center justify-center text-2xl font-bold">
                  {hours}
                </div>
                <span className="text-sm mt-1 opacity-80">Horas</span>
              </div>
              
              <div className="flex flex-col items-center">
                <div className="bg-nexblack/60 rounded-lg w-16 h-16 flex items-center justify-center text-2xl font-bold">
                  {minutes}
                </div>
                <span className="text-sm mt-1 opacity-80">Minutos</span>
              </div>
              
              <div className="flex flex-col items-center">
                <div className="bg-nexblack/60 rounded-lg w-16 h-16 flex items-center justify-center text-2xl font-bold">
                  {seconds}
                </div>
                <span className="text-sm mt-1 opacity-80">Segundos</span>
              </div>
            </div>

            <a 
              href="#contato" 
              className="inline-flex items-center bg-nexorange hover:bg-nexorange/90 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 hover:shadow-lg"
            >
              Quero meu diagnóstico gratuito
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OfferSection;
