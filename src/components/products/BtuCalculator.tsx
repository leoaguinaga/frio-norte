import { useId, useMemo, useState } from 'react';

const STANDARD = [9000, 12000, 18000, 24000, 36000, 48000, 60000];
const rooms = [
  { id: 'dormitorio', label: 'Dormitorio', factor: 1 },
  { id: 'sala', label: 'Sala', factor: 1.1 },
  { id: 'oficina', label: 'Oficina', factor: 1.15 },
  { id: 'comercio', label: 'Comercio', factor: 1.3 },
];

const heights = [
  { value: 2.5, label: '2.5 m' },
  { value: 3, label: '3 m' },
  { value: 4, label: '4 m' },
  { value: 5, label: 'Doble altura' },
];

/** Rule of thumb: ~240 BTU/m³ (≈600 BTU/m² at 2.5 m) adjusted by use and sun exposure. */
export function rawBtu(volume: number, factor: number, sun: boolean) {
  return volume * 240 * factor * (sun ? 1.1 : 1);
}

/** Rounds up to the next standard equipment size. */
export const recommendBtu = (raw: number) => STANDARD.find((s) => s >= raw) ?? STANDARD.at(-1)!;

type Props = { capacities: number[][] };

export default function BtuCalculator({ capacities }: Props) {
  const [area, setArea] = useState(24);
  const [height, setHeight] = useState(2.5);
  const [room, setRoom] = useState('oficina');
  const [sun, setSun] = useState(true);
  const areaId = useId();
  const factor = rooms.find((r) => r.id === room)!.factor;
  const volume = Math.round(area * height);
  const raw = rawBtu(volume, factor, sun);
  const btu = recommendBtu(raw);
  const oversize = raw > STANDARD.at(-1)!;
  const matches = useMemo(() => capacities.filter((c) => c.includes(btu)).length, [capacities, btu]);
  const pct = ((area - 10) / 110) * 100;

  return (
    <div className="flex flex-col gap-6 rounded-[28px] bg-surface p-6 text-ink sm:p-7">
      <p className="text-h4">Calculadora de capacidad</p>
      <div className="flex flex-col gap-3">
        <div className="flex items-baseline justify-between">
          <label htmlFor={areaId} className="text-caption text-muted">Área del ambiente</label>
          <output htmlFor={areaId} className="font-mono text-xl font-medium tabular-nums">{area} m²</output>
        </div>
        <input
          id={areaId} type="range" min={10} max={120} value={area}
          onChange={(e) => setArea(+e.target.value)}
          className="range h-6 w-full cursor-pointer appearance-none bg-transparent"
          style={{ ['--pct' as string]: `${pct}%` }}
        />
        <div className="flex justify-between text-caption text-muted"><span>10</span><span>40</span><span>80</span><span>120 m²</span></div>
      </div>
      <fieldset className="flex flex-col gap-2.5">
        <legend className="mb-2.5 flex w-full items-baseline justify-between text-caption text-muted">
          Altura del techo
          <output className="font-mono text-sm font-medium text-ink tabular-nums">{area} × {height} = {volume} m³</output>
        </legend>
        <div className="grid grid-cols-4 gap-1 rounded-[14px] bg-canvas p-1">
          {heights.map((h) => (
            <label key={h.value} className="cursor-pointer rounded-[10px] py-2 text-center text-caption text-muted transition-[background-color,color,box-shadow] duration-200 has-[:checked]:bg-surface has-[:checked]:text-ink has-[:checked]:shadow-[var(--shadow-float)]">
              <input type="radio" name="height" value={h.value} checked={height === h.value} onChange={() => setHeight(h.value)} className="sr-only" />
              {h.label}
            </label>
          ))}
        </div>
      </fieldset>
      <fieldset className="flex flex-col gap-2.5">
        <legend className="mb-2.5 text-caption text-muted">¿Para qué ambiente?</legend>
        <div className="grid grid-cols-4 gap-1 rounded-[14px] bg-canvas p-1">
          {rooms.map((r) => (
            <label key={r.id} className="cursor-pointer rounded-[10px] py-2 text-center text-caption text-muted transition-[background-color,color,box-shadow] duration-200 has-[:checked]:bg-surface has-[:checked]:text-ink has-[:checked]:shadow-[var(--shadow-float)]">
              <input type="radio" name="room" value={r.id} checked={room === r.id} onChange={() => setRoom(r.id)} className="sr-only" />
              {r.label}
            </label>
          ))}
        </div>
      </fieldset>
      <label className="flex cursor-pointer items-center justify-between text-sm">
        Recibe sol directo por la tarde
        <input type="checkbox" checked={sun} onChange={(e) => setSun(e.target.checked)} className="peer sr-only" />
        <span className="relative h-6 w-11 rounded-full bg-line transition-colors duration-200 peer-checked:bg-primary after:absolute after:left-0.5 after:top-0.5 after:size-5 after:rounded-full after:bg-white after:shadow after:transition-transform after:duration-200 after:ease-[var(--ease-out-strong)] peer-checked:after:translate-x-5" />
      </label>
      <div className="rounded-[18px] bg-primary-soft px-5 py-4" aria-live="polite">
        <p className="text-caption text-primary">Capacidad recomendada</p>
        <p className="mt-1 flex items-baseline gap-2">
          <span key={btu} className="font-mono text-[44px] font-medium leading-none tracking-tight tabular-nums motion-safe:animate-[pop_240ms_var(--ease-out-strong)]">{btu.toLocaleString('en-US')}</span>
          <span className="text-label text-muted">BTU/h</span>
        </p>
        <p className="mt-1.5 text-sm text-muted">
          {oversize ? 'Tu espacio necesita más de un equipo: pide una visita técnica gratuita' : `${matches} equipos compatibles · ${volume} m³`}
        </p>
      </div>
      <a href={`/productos?btu=${btu}#catalogo`} className="inline-flex h-12 items-center justify-center rounded-full bg-ink text-[15px] font-medium text-white transition-transform duration-150 ease-out active:scale-[0.97]">
        Ver {matches} equipos
      </a>
    </div>
  );
}
