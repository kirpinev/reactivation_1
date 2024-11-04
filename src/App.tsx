import { ButtonMobile } from "@alfalab/core-components/button/mobile";

import { Typography } from "@alfalab/core-components/typography";

import ruble from "./assets/ruble.png";
import { LS, LSKeys } from "./ls";
import { appSt } from "./style.css";
import { ThxLayout } from "./thx/ThxLayout";

import { useEffect, useRef, useState } from "react";
import { Slider } from "@alfalab/core-components/slider";
import { Gap } from "@alfalab/core-components/gap";

export const App = () => {
  const [loading, setLoading] = useState(false);
  const [isStopDragging, setIsStopDragging] = useState(false);
  const [startPosition, setStartPosition] = useState(0);
  const [thxShow, setThx] = useState(LS.getItem(LSKeys.ShowThx, false));
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const rubleRef = useRef<HTMLImageElement>(null);
  const targetRef = useRef<HTMLDivElement>(null);

  const submit = () => {
    setLoading(true);
    Promise.resolve().then(() => {
      LS.setItem(LSKeys.ShowThx, true);
      setThx(true);
      setLoading(false);
    });
  };

  useEffect(() => {
    const rubleLeft = rubleRef.current?.getBoundingClientRect().left || 0;

    if (rubleLeft + 6 === targetRef.current?.getBoundingClientRect().left) {
      setSuccess(true);
    } else {
      setError(true);
    }
  }, [startPosition]);

  if (thxShow) {
    return <ThxLayout />;
  }

  return (
    <>
      <Gap size={48} />
      <div className={appSt.container}>
        <Typography.TitleResponsive
          font="system"
          tag="h1"
          view="small"
          weight="semibold"
          className={appSt.productsTitle}
        >
          Попади монеткой в пазл и заработай приз
        </Typography.TitleResponsive>

        <Gap size={24} />

        <div
          style={{
            height: "70px",
            width: "100%",
            backgroundColor: "red",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            position: "relative",
          }}
        >
          <img
            src={ruble}
            alt=""
            height="65"
            ref={rubleRef}
            style={{
              position: "absolute",
              left: Number(startPosition),
              top: 2,
              zIndex: 2,
            }}
          />
          <img
            src={ruble}
            alt=""
            height="65"
            style={{
              position: "absolute",
              right: 51,
              top: 2,
              zIndex: 1,
              opacity: 0.5,
            }}
          />
          <div
            style={{
              height: "56px",
              width: "56px",
              backgroundColor: "white",
              borderRadius: "100%",
              marginRight: "50px",
              position: "absolute",
              right: 5,
              top: 7,
            }}
            ref={targetRef}
          ></div>
        </div>

        <Gap size={48} />

        {/*<input*/}
        {/*  disabled={isStopDraging}*/}
        {/*  type="range"*/}
        {/*  min="0"*/}
        {/*  max="278"*/}
        {/*  style={{ width: "100%" }}*/}
        {/*  value={startPosition}*/}
        {/*  onChange={(event) => setStartPosition(event.target.value)}*/}
        {/*  onPointerDown={() => console.log("нажали на мышь")}*/}
        {/*  onPointerUp={() => {*/}
        {/*    setIsStopDraging(true);*/}
        {/*    console.log(rubleRef.current?.getBoundingClientRect().left);*/}
        {/*    console.log(targetRef.current?.getBoundingClientRect().left);*/}
        {/*  }}*/}
        {/*/>*/}

        <Slider
          size={4}
          disabled={isStopDragging}
          value={Number(startPosition)}
          range={{
            min: 0,
            max:
              (targetRef.current?.getBoundingClientRect().left || 0) + 30 || 0,
          }}
          onChange={(event) => setStartPosition(event.value)}
          onStart={() => console.log("нажали на мышь")}
          onEnd={() => {
            setIsStopDragging(true);
          }}
        />

        {error && (
          <Typography.Text>
            Близко, но не совсем точно. Попробуйте еще раз!
          </Typography.Text>
        )}

        {success && <Typography.Text>Победа</Typography.Text>}
      </div>

      <div className={appSt.bottomBtnThx}>
        <ButtonMobile
          loading={loading}
          block
          view="primary"
          onClick={submit}
        >
          Вперед
        </ButtonMobile>
      </div>
    </>
  );
};
