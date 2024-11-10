import { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setColorMode } from '@/store/config/config-slice';
import ColorModes from '@/data/color-modes';
import _capitalize from 'lodash/capitalize';
import _find from 'lodash/find';

export default function ColorModeControl() {
  const colorMode = useSelector((state) => state.config.colorMode);
  const dispatch = useDispatch();

  const currentColorModeIconClass = useMemo(() => {
    const hitMode = _find(ColorModes, (mode) => mode.mode === colorMode);
    if (!hitMode) return null;
    return hitMode.iconClass;
  }, [colorMode]);

  // Change color mode in Redux and tag <html data-bs-theme>
  const changeColorMode = (mode) => {
    dispatch(setColorMode(mode));
    document.documentElement.dataset.bsTheme = mode;
  };

  return (
    <div className="nav-item dropdown ms-0 ms-lg-2">
      <button
        className="btn btn-secondary dropdown-toggle"
        type="button"
        data-bs-toggle="dropdown"
      >
        <i className={currentColorModeIconClass}></i>
      </button>
      <ul className="dropdown-menu dropdown-menu-lg-end">
        {ColorModes.map((mode, index) => (
          <li key={index}>
            <button
              type="button"
              className={`dropdown-item d-flex align-items-center ${colorMode === mode.mode ? 'active' : ''}`}
              onClick={() => changeColorMode(mode.mode)}
            >
              <i className={mode.iconClass}></i>
              {_capitalize(mode.mode)}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
