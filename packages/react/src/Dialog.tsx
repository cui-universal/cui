import * as React from "react";
import { dialogVariants, cn } from "@cui/theme";
import { X } from "lucide-react";
import {
  Portal,
  Slot,
  composeEventHandlers,
  useComposedRefs,
  useControllableState,
  useDismissableLayer,
  useFocusTrap,
  usePresence,
  useScrollLock,
} from "./primitives";

interface DialogContextValue {
  open: boolean;
  setOpen: (open: boolean | ((prev: boolean) => boolean)) => void;
  modal: boolean;
  contentId: string;
  titleId: string;
  descriptionId: string;
}

const DialogContext = React.createContext<DialogContextValue | null>(null);

function useDialogContext(component: string) {
  const ctx = React.useContext(DialogContext);
  if (!ctx) throw new Error(`<${component}> must be used within <Dialog>`);
  return ctx;
}

export interface DialogProps {
  children?: React.ReactNode;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  /** Modal dialogs trap focus, lock scroll and block outside interaction. */
  modal?: boolean;
}

export const Dialog = ({ children, open: openProp, defaultOpen = false, onOpenChange, modal = true }: DialogProps) => {
  const [open, setOpen] = useControllableState({ prop: openProp, defaultProp: defaultOpen, onChange: onOpenChange });
  const id = React.useId();
  return (
    <DialogContext.Provider
      value={{
        open,
        setOpen,
        modal,
        contentId: `${id}-content`,
        titleId: `${id}-title`,
        descriptionId: `${id}-description`,
      }}
    >
      {children}
    </DialogContext.Provider>
  );
};
Dialog.displayName = "Dialog";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & { asChild?: boolean };

export const DialogTrigger = React.forwardRef<HTMLButtonElement, ButtonProps>(({ asChild, onClick, ...props }, ref) => {
  const ctx = useDialogContext("DialogTrigger");
  const Comp: React.ElementType = asChild ? Slot : "button";
  return (
    <Comp
      ref={ref}
      type={asChild ? undefined : "button"}
      aria-haspopup="dialog"
      aria-expanded={ctx.open}
      aria-controls={ctx.open ? ctx.contentId : undefined}
      data-state={ctx.open ? "open" : "closed"}
      onClick={composeEventHandlers(onClick, () => ctx.setOpen((prev) => !prev))}
      {...props}
    />
  );
});
DialogTrigger.displayName = "DialogTrigger";

export const DialogClose = React.forwardRef<HTMLButtonElement, ButtonProps>(({ asChild, onClick, ...props }, ref) => {
  const ctx = useDialogContext("DialogClose");
  const Comp: React.ElementType = asChild ? Slot : "button";
  return (
    <Comp
      ref={ref}
      type={asChild ? undefined : "button"}
      onClick={composeEventHandlers(onClick, () => ctx.setOpen(false))}
      {...props}
    />
  );
});
DialogClose.displayName = "DialogClose";

export const DialogPortal = ({ children, container }: { children?: React.ReactNode; container?: HTMLElement | null }) => (
  <Portal container={container}>{children}</Portal>
);
DialogPortal.displayName = "DialogPortal";

export const DialogOverlay = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, forwardedRef) => {
    const ctx = useDialogContext("DialogOverlay");
    const { overlay } = dialogVariants();
    const { present, ref: presenceRef } = usePresence(ctx.open);
    const ref = useComposedRefs<HTMLDivElement | null>(forwardedRef, presenceRef);
    if (!present || !ctx.modal) return null;
    return (
      <div
        ref={ref}
        aria-hidden
        data-state={ctx.open ? "open" : "closed"}
        className={cn(overlay(), className)}
        {...props}
      />
    );
  }
);
DialogOverlay.displayName = "DialogOverlay";

export interface DialogContentProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Hide the built-in close (X) button. */
  hideClose?: boolean;
  onEscapeKeyDown?: (event: KeyboardEvent) => void;
  onInteractOutside?: (event: Event) => void;
}

export const DialogContent = React.forwardRef<HTMLDivElement, DialogContentProps>(
  ({ className, children, hideClose, onEscapeKeyDown: _onEscape, onInteractOutside: _onOutside, ...props }, forwardedRef) => {
    const ctx = useDialogContext("DialogContent");
    const { content, close } = dialogVariants();
    const { present, ref: presenceRef } = usePresence(ctx.open);
    const [node, setNode] = React.useState<HTMLDivElement | null>(null);
    const ref = useComposedRefs<HTMLDivElement | null>(forwardedRef, presenceRef, setNode);

    useDismissableLayer({
      enabled: ctx.open,
      getElements: () => [node],
      onDismiss: () => ctx.setOpen(false),
    });
    useFocusTrap(node, ctx.open && ctx.modal);
    useScrollLock(ctx.open && ctx.modal);

    if (!present) return null;

    return (
      <DialogPortal>
        <DialogOverlay />
        <div
          ref={ref}
          role="dialog"
          id={ctx.contentId}
          aria-modal={ctx.modal || undefined}
          aria-labelledby={ctx.titleId}
          aria-describedby={ctx.descriptionId}
          tabIndex={-1}
          data-cui-layer=""
          data-state={ctx.open ? "open" : "closed"}
          className={cn(content(), className)}
          {...props}
        >
          {children}
          {!hideClose && (
            <DialogClose className={cn(close())}>
              <X className="h-4 w-4" />
              <span className="sr-only">Close</span>
            </DialogClose>
          )}
        </div>
      </DialogPortal>
    );
  }
);
DialogContent.displayName = "DialogContent";

export const DialogHeader = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => {
  const { header } = dialogVariants();
  return <div className={cn(header(), className)} {...props} />;
};
DialogHeader.displayName = "DialogHeader";

export const DialogFooter = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => {
  const { footer } = dialogVariants();
  return <div className={cn(footer(), className)} {...props} />;
};
DialogFooter.displayName = "DialogFooter";

export const DialogTitle = React.forwardRef<HTMLHeadingElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => {
    const ctx = useDialogContext("DialogTitle");
    const { title } = dialogVariants();
    return <h2 ref={ref} id={ctx.titleId} className={cn(title(), className)} {...props} />;
  }
);
DialogTitle.displayName = "DialogTitle";

export const DialogDescription = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => {
    const ctx = useDialogContext("DialogDescription");
    const { description } = dialogVariants();
    return <p ref={ref} id={ctx.descriptionId} className={cn(description(), className)} {...props} />;
  }
);
DialogDescription.displayName = "DialogDescription";
