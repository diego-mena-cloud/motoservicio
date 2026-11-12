// import React, { type CSSProperties } from "react";

import { importLibrary } from "@googlemaps/js-api-loader";
import { useEffect, useRef, useState } from "react";

const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

function Map() {
  // const estiloMapa: CSSProperties = {
  //   backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuDoo_LMPqrBquOS8uGbH0GKru2VN-lEung2P1A6Z_nC9EubSFOvQpzZlDKSanrPRzR0wXWNGTaQ_8rxg3TQ0UYH5B1JtvFKvo9SUEpRddOgAukZNL5Ds3ggkpyz5aT7ncHxdOTqoo9T6moAIlnsaEg7XI2yj4zQYEFpkHGH530JGXFMGn9LV9Ob9rDjxCxJhsfZujwQeO3zU8d6w1VRkRFGifoMetCR72ea_IjAoVyR')`,
  // };

  // const estiloFont: CSSProperties = {
  //   fontVariationSettings: "FILL",
  // };
  
  const mapElement  = useRef<HTMLDivElement>(null);
  const [isLoading, SetISLoading] = useState<boolean>(false);
  const [loadError, SetLoadError] = useState<string>("");


  useEffect(()=>{
    if (!apiKey || !mapElement.current) {
      return;
    }


    async function inicializarMapa(){
      try {
        const {Map:GoogleMap} = importLibrary("maps");
      } catch (error) {
        console.log(error); 
        
      }
    }

   void inicializarMapa();

  }, [])

  return (
    <section className="bg-surface-container-lowest rounded-2xl border border-border-subtle overflow-hidden shadow-sm flex flex-col">
      {/* header */}
     
      <div className="px-5 py-3 border-b border-border-subtle/80 flex items-center justify-between">
        <h2 className="text-xs font-bold text-on-surface uppercase tracking-wider">
          Ruta Proyectada
        </h2>
        <span className="text-xs font-bold text-secondary bg-surface-container-low px-2.5 py-1 rounded-md">
          3.8 km • 12 min
        </span>
      </div>

      {/* mapa */}
      <div className="relative w-full h-64 bg-slate-100 overflow-hidden"
       ref={mapElement}></div>

      {/* footer */}
      <div className="px-5 py-3 bg-surface-container-low/50 flex items-center justify-between text-xs text-secondary border-t border-border-subtle/60">
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-blue-600"></span>
          <span className="text-on-surface font-medium">Origen: Centro</span>
        </div>
        <span className="text-slate-300">•</span>
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-primary"></span>
          <span
            className="text-on-surface font-medium truncate max-w-[170px]"
            id="mapDestPreview"
          >
            Av. Las Camelias #420
          </span>
        </div>
      </div>
    </section>
  );
}

export default Map;
