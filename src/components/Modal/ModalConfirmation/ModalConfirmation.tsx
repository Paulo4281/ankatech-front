import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { useState } from "react"

type TModalConfirmationProps = {
  onAccept: () => void
  opened: boolean
  onOpenChange: (open: boolean) => void
  onReject?: () => void
  title?: string
  description?: string
}

function ModalConfirmationComponent(
  {
    onAccept,
    onReject,
    opened,
    title = "Confirmação",
    description = "Tem certeza que deseja continuar?",
    onOpenChange
  }: TModalConfirmationProps
) {
  const handleAccept = () => {
    onAccept()
    onOpenChange(false)
  }

  const handleReject = () => {
    if (onReject) {
      onReject()
    }
    onOpenChange(false)
  }

  return (
    <Dialog open={opened} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>

        <p className="my-4">{description}</p>

        <DialogFooter className="flex justify-end gap-2">
          <Button variant="outline" onClick={handleReject}>Cancelar</Button>
          <Button onClick={handleAccept}>Confirmar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export {
  ModalConfirmationComponent as ModalConfirmation
}
