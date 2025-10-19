import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Button } from "./ui/button";

interface ConfirmBoxProps {
  isOpen: boolean;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function ConfirmBox({
  isOpen,
  title,
  message,
  confirmText = "Confirm",
  cancelText = "Cancel",
  onConfirm,
  onCancel,
}: ConfirmBoxProps) {
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onCancel()}>
      <DialogContent className="max-w-sm" showCloseButton={false}>
        <DialogHeader className="text-center">
          <DialogTitle className="text-xl font-bold text-gray-800 mb-2">
            {title}
          </DialogTitle>
          <DialogDescription className="text-gray-600">
            {message}
          </DialogDescription>
        </DialogHeader>
        
        <DialogFooter className="flex  gap-3">
          <Button 
            onClick={onConfirm}
            variant="destructive"
            className=" flex-1"
          >
            {confirmText}
          </Button>
          <Button 
            onClick={onCancel}
            variant="outline"
            className=" flex-1"
          >
            {cancelText}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}