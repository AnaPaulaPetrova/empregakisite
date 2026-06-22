"use client";

import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import VagasCard from "@/components/VagasCard/VagasCard";
import styles from "./Carrossel.module.css";

export default function CarrosselVagas({ vagas }) {
  return (
    <section className={styles.vagasSection}> 
        <div className={styles.vagasHeader}>
        <div>
          <h2>Vagas em destaque</h2>
          <p> Confira as oportunidades mais recentes. </p>
        </div>

        <Link href="/vagas">
          <button className={styles.btnVerTodas}>
            Ver todas →
          </button>
        </Link>
      </div>

      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={30}
        navigation
        pagination={{ clickable: true }}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
        breakpoints={{
          320: {
            slidesPerView: 1,
          },
          640: {
            slidesPerView: 2,
          },
          1024: {
            slidesPerView: 3,
          },
          1440: {
            slidesPerView: 4,
          },
        }}
      >
        {vagas.map((vaga) => (
          <SwiperSlide key={vaga.id}>
            <div className={styles.cardWrapper}>
              <VagasCard
                id={vaga.id}
                titulo={vaga.titulo}
                empresaNome={vaga.empresa_nome}
                localizacao={vaga.localizacao}
                salario={vaga.salario}
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}