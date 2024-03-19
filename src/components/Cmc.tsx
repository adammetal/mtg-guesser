"use client";

export default function Cmc({
  onChange,
  value,
}: {
  onChange: (val: string) => void;
  value: string;
}) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      currentTarget: { value },
    } = e;
    onChange(value);
  };

  return (
    <>
      <label
        style={{ lineHeight: "30px" }}
        className="col-span-3 text-right bg-white p-2"
        htmlFor="cmc"
      >
        Converted Mana Cost:
      </label>
      <input
        className="col-span-3 outline-none border-1 box-border text-black bg-white border-gray-700 text-lg w-full p-2"
        id="cmc"
        min="0"
        type="number"
        value={value}
        onChange={handleChange}
      />
    </>
  );
}
