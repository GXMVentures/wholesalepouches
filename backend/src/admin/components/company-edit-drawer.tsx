import { Drawer } from "@medusajs/ui";
import { CompanyDTO } from "../../modules/company/types/common";
import { UpdateCompanyDTO } from "../../modules/company/types/mutations";
import { useUpdateCompany } from "../hooks";
import { CompanyForm } from "./company-form";

export function CompanyEditDrawer({
  company,
  refetch,
  open,
  setOpen,
}: {
  company: CompanyDTO;
  refetch: () => void;
  open: boolean;
  setOpen: (open: boolean) => void;
}) {
  const { mutate, loading, error } = useUpdateCompany(company.id);

  const { created_at, updated_at, id, ...currentData } = company;

  const handleSubmit = async (formData: UpdateCompanyDTO) => {
    await mutate(formData).then(() => setOpen(false));
    refetch();
  };

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <Drawer.Content className="z-50">
        <Drawer.Header>
          <Drawer.Title>Edit Company</Drawer.Title>
        </Drawer.Header>

        <CompanyForm
          handleSubmit={handleSubmit}
          loading={loading}
          error={error}
          company={currentData}
        />
      </Drawer.Content>
    </Drawer>
  );
}