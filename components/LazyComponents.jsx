import dynamic from 'next/dynamic';

// Lazy load heavy components
export const LazyLottie = dynamic(() => import('react-lottie-player'), {
  ssr: false,
  loading: () => <div className="w-full h-full bg-gray-200 animate-pulse rounded" />
});

export const LazyToastContainer = dynamic(() => import('react-toastify').then(mod => ({ default: mod.ToastContainer })), {
  ssr: false,
  loading: () => null
});

export const LazyModal = dynamic(() => import('@heroui/react').then(mod => ({ default: mod.Modal })), {
  ssr: false,
  loading: () => null
});

export const LazyAccordion = dynamic(() => import('@heroui/react').then(mod => ({ default: mod.Accordion })), {
  ssr: false,
  loading: () => null
});

export const LazyAccordionItem = dynamic(() => import('@heroui/react').then(mod => ({ default: mod.AccordionItem })), {
  ssr: false,
  loading: () => null
});

// Lazy load heavy UI components that are not immediately visible
export const LazyPopover = dynamic(() => import('@heroui/react').then(mod => ({ default: mod.Popover })), {
  ssr: false,
  loading: () => null
});

export const LazyPopoverContent = dynamic(() => import('@heroui/react').then(mod => ({ default: mod.PopoverContent })), {
  ssr: false,
  loading: () => null
});

export const LazyPopoverTrigger = dynamic(() => import('@heroui/react').then(mod => ({ default: mod.PopoverTrigger })), {
  ssr: false,
  loading: () => null
});

export const LazyTooltip = dynamic(() => import('@heroui/react').then(mod => ({ default: mod.Tooltip })), {
  ssr: false,
  loading: () => null
});