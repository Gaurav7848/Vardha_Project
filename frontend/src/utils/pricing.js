const MIN_AREA = 500;
const MAX_AREA = 42000;
const SMALL_RATE = 60;
const LARGE_RATE = 24;

let cachedPricingSettings = null;

const calculateAreaFromDimensions = (length, width) => {
  if (!length || !width) return 0;
  return Math.floor(length * width);
};

const getPricingRate = (area) => {
  if (area <= 0) return 0;
  const slabLimit = cachedPricingSettings?.slabLimit || 5000;
  const smallRate = cachedPricingSettings?.smallRate ?? SMALL_RATE;
  const largeRate = cachedPricingSettings?.largeRate ?? LARGE_RATE;
  if (area <= slabLimit) return smallRate;
  return largeRate;
};

const calculateMonthlyAmount = (area, rate) => {
  if (!area || !rate) return 0;
  return area * rate;
};

const validateArea = (area) => {
  const minArea = cachedPricingSettings?.minArea || MIN_AREA;
  const maxArea = cachedPricingSettings?.maxArea || MAX_AREA;
  if (!area || area <= 0) {
    return { valid: false, message: 'Please enter a valid area.' };
  }
  if (area < minArea) {
    return { valid: false, message: `Minimum warehouse requirement is ${minArea} sq.ft. Please increase your requirement.` };
  }
  if (area > maxArea) {
    return { valid: false, message: `Requirements above ${maxArea.toLocaleString()} sq.ft. require a customized solution. Please contact our team.` };
  }
  return { valid: true };
};

const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-IN').format(amount);
};

const loadPricingSettings = async () => {
  try {
    const response = await fetch('/api/admin/pricing');
    const result = await response.json();
    if (result.success && result.data) {
      cachedPricingSettings = result.data;
    }
  } catch (error) {
    console.error('Failed to load pricing settings:', error);
  }
};

export {
  MIN_AREA,
  MAX_AREA,
  SMALL_RATE,
  LARGE_RATE,
  calculateAreaFromDimensions,
  getPricingRate,
  calculateMonthlyAmount,
  validateArea,
  formatCurrency,
  loadPricingSettings,
  cachedPricingSettings,
};
