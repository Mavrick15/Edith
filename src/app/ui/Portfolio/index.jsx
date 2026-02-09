"use client";

import { Icon } from "@iconify/react";
import Image from "next/image";
import React, { useState, useEffect, useRef } from "react";

const DEFAULT_INTERVAL_MIN = 3000;
const DEFAULT_INTERVAL_MAX = 6000;
const DEFAULT_CROSSFADE_MS = 800;
const INITIAL_DELAY_MAX = 4000;

export default function Portfolio({
  imgUrl,
  images,
  intervalMin = DEFAULT_INTERVAL_MIN,
  intervalMax = DEFAULT_INTERVAL_MAX,
  crossfadeMs = DEFAULT_CROSSFADE_MS,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [prevIndex, setPrevIndex] = useState(null);
  const randomRef = useRef({
    initialDelay: Math.random() * INITIAL_DELAY_MAX,
    getNextInterval: () =>
      intervalMin + Math.random() * (intervalMax - intervalMin),
  });

  const items = images?.length ? images : imgUrl ? [imgUrl] : [];
  const currentImg = items[currentIndex];

  useEffect(() => {
    if (items.length <= 1) return;
    randomRef.current.getNextInterval = () =>
      intervalMin + Math.random() * (intervalMax - intervalMin);
  }, [intervalMin, intervalMax, items.length]);

  useEffect(() => {
    if (items.length <= 1) return;
    let t;
    const scheduleNext = () => {
      t = setTimeout(() => {
        setCurrentIndex((i) => {
          setPrevIndex(i);
          setTimeout(() => setPrevIndex(null), crossfadeMs);
          return (i + 1) % items.length;
        });
        scheduleNext();
      }, randomRef.current.getNextInterval());
    };
    t = setTimeout(scheduleNext, randomRef.current.initialDelay);
    return () => clearTimeout(t);
  }, [items.length, crossfadeMs]);

  if (!currentImg) return null;

  const showingPrev = prevIndex !== null && prevIndex !== currentIndex;

  return (
    <>
      <div className="cs_portfolio cs_style_1 cs_radius_20 overflow-hidden">
        <div className="cs_portfolio_img d-block cs_bg_filed st_lightbox_item position-relative">
          {showingPrev && (
            <div
              className="cs_portfolio_carousel_layer cs_portfolio_carousel_out"
              style={{
                backgroundImage: `url(${items[prevIndex]})`,
                animationDuration: `${crossfadeMs}ms`,
              }}
            />
          )}
          <div
            key={currentIndex}
            className="cs_portfolio_carousel_layer cs_portfolio_carousel_in"
            style={{
              backgroundImage: `url(${currentImg})`,
              animationDuration: `${crossfadeMs}ms`,
            }}
          />
          <button
            type="button"
            onClick={() => setIsOpen(true)}
            className="border-0 bg-transparent p-0 w-100 h-100 d-block position-absolute top-0 start-0"
            style={{ cursor: "zoom-in", zIndex: 5 }}
          >
            <span className="position-relative d-block w-100 h-100">
              <Image
                src={currentImg}
                alt=""
                fill
                className="object-cover opacity-0"
                sizes="100vw"
              />
            </span>
          </button>
          <span className="cs_link_hover">
            <i>
              <Icon icon="fa6-solid:arrows-up-down-left-right" />
            </i>
          </span>
        </div>
      </div>

      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Agrandir l'image"
          className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center"
          style={{
            zIndex: 9999,
            backgroundColor: "rgba(0,0,0,0.9)",
          }}
          onClick={() => setIsOpen(false)}
        >
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            className="position-absolute top-0 end-0 m-3 border-0 bg-white rounded-circle p-2"
            aria-label="Fermer"
          >
            <Icon icon="fa6-solid:xmark" />
          </button>
          <div
            className="position-relative"
            style={{ width: "90vw", height: "90vh" }}
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={currentImg}
              alt="Galerie"
              fill
              className="object-contain"
            />
          </div>
        </div>
      )}
    </>
  );
}
