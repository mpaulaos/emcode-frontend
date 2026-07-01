import { MoreVertical, Eye, Pencil, UserMinus } from "lucide-react";
import {
  MenuTrigger,
  Button,
  Menu,
  MenuItem,
  Popover,
} from "react-aria-components";

interface StudentActionsMenuProps {
  studentName: string;
  onViewDetails: () => void;
  onEdit: () => void;
  onRemove: () => void;
  removeLabel?: string;
}

function StudentActionsMenu({
  studentName,
  onViewDetails,
  onEdit,
  onRemove,
  removeLabel = "Remover del curso",
}: StudentActionsMenuProps) {
  return (
    <MenuTrigger>
      <Button
        aria-label={`Más acciones para ${studentName}`}
        className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg text-text-disabled transition hover:bg-surface-card hover:text-text-body focus:outline-none focus-visible:ring-2 focus-visible:ring-border-focus"
      >
        <MoreVertical size={18} aria-hidden="true" />
      </Button>
      <Popover placement="bottom end" offset={4}>
        <Menu
          className="min-w-44 rounded-lg border border-border-card bg-surface-primary p-1 shadow-lg outline-none"
          onAction={(key) => {
            if (key === "view") onViewDetails();
            if (key === "edit") onEdit();
            if (key === "remove") onRemove();
          }}
        >
          <MenuItem
            id="view"
            className="flex cursor-pointer items-center gap-2 rounded-md px-3 py-2 text-sm text-text-body outline-none transition data-hovered:bg-surface-card data-focused:bg-surface-card"
          >
            <Eye size={15} aria-hidden="true" />
            Ver detalles
          </MenuItem>
          <MenuItem
            id="edit"
            className="flex cursor-pointer items-center gap-2 rounded-md px-3 py-2 text-sm text-text-body outline-none transition data-hovered:bg-surface-card data-focused:bg-surface-card"
          >
            <Pencil size={15} aria-hidden="true" />
            Editar
          </MenuItem>
          <MenuItem
            id="remove"
            className="flex cursor-pointer items-center gap-2 rounded-md px-3 py-2 text-sm text-text-body outline-none transition data-hovered:bg-surface-card data-focused:bg-surface-card"
          >
            <UserMinus size={15} aria-hidden="true" />
            {removeLabel}
          </MenuItem>
        </Menu>
      </Popover>
    </MenuTrigger>
  );
}

export default StudentActionsMenu;
