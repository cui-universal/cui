import * as React from "react";
import { avatarVariants, type AvatarVariants, cn } from "@cui/theme";

type ImageLoadingStatus = "idle" | "loading" | "loaded" | "error";

interface AvatarContextValue {
  status: ImageLoadingStatus;
  setStatus: React.Dispatch<React.SetStateAction<ImageLoadingStatus>>;
}

const AvatarContext = React.createContext<AvatarContextValue | null>(null);

export interface AvatarProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    AvatarVariants {}

export const Avatar = React.forwardRef<HTMLSpanElement, AvatarProps>(
  ({ className, size, children, ...props }, ref) => {
    const [status, setStatus] = React.useState<ImageLoadingStatus>("idle");
    const { root } = avatarVariants({ size });

    return (
      <AvatarContext.Provider value={{ status, setStatus }}>
        <span
          ref={ref}
          className={cn(root(), className)}
          {...props}
        >
          {children}
        </span>
      </AvatarContext.Provider>
    );
  }
);
Avatar.displayName = "Avatar";

export interface AvatarImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  onLoadingStatusChange?: (status: ImageLoadingStatus) => void;
}

export const AvatarImage = React.forwardRef<HTMLImageElement, AvatarImageProps>(
  ({ className, src, alt, onLoadingStatusChange, onLoad, onError, ...props }, ref) => {
    const context = React.useContext(AvatarContext);
    const { image } = avatarVariants();

    React.useEffect(() => {
      if (!src) {
        context?.setStatus("error");
        onLoadingStatusChange?.("error");
        return;
      }

      let isMounted = true;
      const img = new Image();
      context?.setStatus("loading");
      onLoadingStatusChange?.("loading");

      img.src = src;
      img.onload = () => {
        if (!isMounted) return;
        context?.setStatus("loaded");
        onLoadingStatusChange?.("loaded");
      };
      img.onerror = () => {
        if (!isMounted) return;
        context?.setStatus("error");
        onLoadingStatusChange?.("error");
      };

      return () => {
        isMounted = false;
      };
    }, [src]);

    if (context?.status !== "loaded") {
      return null;
    }

    return (
      <img
        ref={ref}
        src={src}
        alt={alt}
        className={cn(image(), className)}
        onLoad={onLoad}
        onError={onError}
        {...props}
      />
    );
  }
);
AvatarImage.displayName = "AvatarImage";

export interface AvatarFallbackProps extends React.HTMLAttributes<HTMLSpanElement> {
  delayMs?: number;
}

export const AvatarFallback = React.forwardRef<HTMLSpanElement, AvatarFallbackProps>(
  ({ className, children, delayMs, ...props }, ref) => {
    const context = React.useContext(AvatarContext);
    const [canRender, setCanRender] = React.useState(delayMs === undefined);
    const { fallback } = avatarVariants();

    React.useEffect(() => {
      if (delayMs !== undefined) {
        const timer = setTimeout(() => setCanRender(true), delayMs);
        return () => clearTimeout(timer);
      }
    }, [delayMs]);

    if (context?.status === "loaded" || !canRender) {
      return null;
    }

    return (
      <span
        ref={ref}
        className={cn(fallback(), className)}
        {...props}
      >
        {children}
      </span>
    );
  }
);
AvatarFallback.displayName = "AvatarFallback";
