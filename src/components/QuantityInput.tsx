import { MAX_QUANTITY } from "../cart/cartReducer";

interface Props {
  value: number;
  onChange: (value: number) => void;
  label: string;
}

/** Minus / number / plus stepper, limited to 1–MAX_QUANTITY. */
const QuantityInput = ({ value, onChange, label }: Props) => (
  <div role="group" aria-label={label} className="inline-flex items-center rounded-md border border-gray-300">
    <button
      type="button"
      onClick={() => onChange(value - 1)}
      disabled={value <= 1}
      aria-label="Decrease quantity"
      className="size-10 text-lg disabled:text-gray-300"
    >
      −
    </button>
    <span className="w-8 text-center font-medium" aria-live="polite">
      {value}
    </span>
    <button
      type="button"
      onClick={() => onChange(value + 1)}
      disabled={value >= MAX_QUANTITY}
      aria-label="Increase quantity"
      className="size-10 text-lg disabled:text-gray-300"
    >
      +
    </button>
  </div>
);

export default QuantityInput;
