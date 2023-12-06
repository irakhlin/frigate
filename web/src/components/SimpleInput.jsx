import { h } from 'preact';
import { useCallback, useEffect, useState } from 'preact/hooks';
import Button from './Button';

export default function SimpleInput({
  className,
  helpText,
  keyboardType = 'text',
  inputRef,
  label,
  onBlur,
  onChangeText,
  onFocus,
  onEnter,
  readonly,
  value: propValue = '',
  ...props
}) {
  const [isFocused, setFocused] = useState(false);
  const [value, setValue] = useState(propValue);

  const handleFocus = useCallback(
    (event) => {
      setFocused(true);
      onFocus && onFocus(event);
    },
    [onFocus]
  );

  const handleBlur = useCallback(
    (event) => {
      setFocused(false);
      onBlur && onBlur(event);
    },
    [onBlur]
  );


  const handleKeyDown = useCallback(
    (event) => {
        console.log('key down');
        console.log(event);
      },
  );


  const handleChange = useCallback(
    (event) => {
      const { value } = event.target;
      setValue(value);
      onChangeText && onChangeText(value);
    },
    [onChangeText, setValue]
  );

  useEffect(() => {
    if (propValue !== value) {
      setValue(propValue);
    }
    // DO NOT include `value`
  }, [propValue, setValue]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
          <div>
            <input
              className={`${className}`}
              onBlur={handleBlur}
              onFocus={handleFocus}
              onInput={handleChange}
              readOnly={readonly}
              tabIndex="0"
              type={keyboardType}
              value={value}
              {...props}
            />
          </div>
  );
}
