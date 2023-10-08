import { useState } from 'react';
import { easeInOut, motion } from 'framer-motion';
import './ToggleSwitch.css';

export const ToggleSwitch = ({
  checked = false,
  name,
  ...rest
}: {
  checked?: boolean;
  name: string;
}) => {
  const [isOn, setOn] = useState(checked);
  const clickHandler = () => setOn(!isOn);
  return (
    <>
      <div
        className={'ToggleSwitch ' + (isOn ? 'on' : 'off')}
        onClick={clickHandler}
      >
        <motion.div transition={{ type: easeInOut, duration: 1 }} layout>
          &nbsp;
        </motion.div>
      </div>
      <input
        type='checkbox'
        defaultChecked={isOn}
        style={{ visibility: 'hidden', display: 'none', zIndex: -5 }}
        name={name}
      />
    </>
  );
};
