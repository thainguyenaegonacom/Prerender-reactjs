import { compute, validateColor } from './colorCodeToFilter';

export const setColorHeaderIcons = (color: any) => {
  if (!validateColor(color)) {
    color = '';
  }
  const headerIcons: any = document.querySelector(`.menu-header .banner-item`);
  headerIcons?.style.setProperty('background-color', color, 'important');
};

export const setColorSearchBox = (color: any) => {
  if (!validateColor(color)) {
    color = '';
  }
  const searchBox: any = document.querySelectorAll(`.search-box input`);
  searchBox?.forEach((e: any) => {
    e?.style.setProperty('--c', color);
  });
};

export const setColorCartBadge = (color: any) => {
  if (!validateColor(color)) {
    color = '';
  }
  const cartBadge: any = document.querySelectorAll(`.icon-bag .badge`);
  cartBadge?.forEach((e: any) => {
    e?.style.setProperty('background-color', color, 'important');
  });
};

export const setColorFooter = (color: any, borderColor: any) => {
  if (!validateColor(color)) {
    color = '';
  }
  const footer: any = document.querySelector(`FOOTER.blk-footer`);
  footer?.style.setProperty('background-color', color, 'important');
  if (borderColor) {
    if (!validateColor(borderColor)) {
      borderColor = '';
    }
    footer?.style.setProperty('border-top-color', borderColor, 'important');
  }
};

export const setColorBlkIcons = (color: any) => {
  if (!validateColor(color)) {
    color = '';
  }
  const blkIcons: any = document.querySelector(`.main-content .blk-icon`);
  blkIcons?.style.setProperty('background-color', color, 'important');
};

export const setColorBreadcrumbBlkIcons = (color: any) => {
  if (!validateColor(color)) {
    color = '';
  }
  const blkIcons: any = document.querySelectorAll(`.wrapper-breadcrumb .blk-icon ul li`);
  blkIcons?.forEach((e: any) => {
    e?.style.setProperty('color', color, 'important');
    e?.style.setProperty('border-color', color, 'important');
    e.querySelector('img')?.style.setProperty(
      'filter',
      compute(color)?.filterRaw,
      'important',
    );
  });
};

export const setColorResetFilterButton = (color: any) => {
  if (!validateColor(color)) {
    color = '';
  }
  const button: any = document.querySelector(`.filter-box .btn-clear`);
  button?.style.setProperty('color', color, 'important');
};

export const setColorResultFilterBox = (color: any) => {
  if (!validateColor(color)) {
    color = '';
  }
  const filterBoxs: any = document.querySelectorAll(`.filter-box .result-filter-box ul li`);
  filterBoxs?.forEach((e: any) => {
    e?.querySelector('span')?.style.setProperty('color', color, 'important');
    e?.style.setProperty('border-color', color, 'important');
    e?.querySelector('.gg-close')?.style.setProperty('color', color, 'important');
  });
};

export const setColorWrapperFilterBox = (color: any, foregroundColor: any) => {
  if (!validateColor(color)) {
    color = '';
  }
  const wrapper: any = document.querySelector(`.wrapper-filter-box`);
  wrapper?.style.setProperty('background-color', color, 'important');

  if (!validateColor(foregroundColor)) {
    foregroundColor = '';
  }
  wrapper?.querySelectorAll('div')?.forEach((e: any) => {
    e?.style.setProperty('border-bottom-color', foregroundColor, 'important');
  });
};
