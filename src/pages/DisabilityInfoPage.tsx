import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from 'react-aria-components';
import { ArrowLeft } from 'lucide-react';
import CategoryChips from '../components/CategoryChips';
import DisabilitySidebar from '../components/DisabilitySidebar';
import DisabilityInfoPanel from '../components/DisabilityInfoPanel';
import { disabilityCategories, disabilityContentMap} from '../types/disabilities';

function DisabilityInfoPage() {
  const navigate = useNavigate();
  const [activeCategoryId, setActiveCategoryId] = useState(
    disabilityCategories[0].id,
  );
  const [activeItemId, setActiveItemId] = useState(
    disabilityCategories[0].sections[0].items[0].id,
  );

  const activeCategory = disabilityCategories.find(
    (c) => c.id === activeCategoryId,
  )!;
  const content =
    disabilityContentMap[activeItemId] ?? disabilityContentMap.ninguna;

  function handleSelectCategory(categoryId: string) {
    const category = disabilityCategories.find((c) => c.id === categoryId)!;
    setActiveCategoryId(categoryId);
    setActiveItemId(category.sections[0].items[0].id);
  }

  return (
    <main className="flex flex-col gap-6 px-4 py-8 lg:gap-8 lg:px-16 lg:py-12">
      <Button
        onPress={() => navigate("/teacher")}
        className="flex items-center gap-1.5 text-sm text-text-body hover:text-text-headings transition focus:outline-none focus-visible:ring-2 focus-visible:ring-border-focus rounded w-fit cursor-pointer"
        aria-label="Volver al dashboard"
      >
        <ArrowLeft size={16} strokeWidth={2} aria-hidden="true" />
        Volver
      </Button>

      <h1 className="text-2xl font-bold text-text-headings sm:text-3xl">
        Categorías
      </h1>

      <CategoryChips
        categories={disabilityCategories.map(({ id, label }) => ({
          id,
          label,
        }))}
        activeId={activeCategoryId}
        onSelect={handleSelectCategory}
      />

      <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:gap-12">
        <DisabilitySidebar
          category={activeCategory}
          activeItemId={activeItemId}
          onSelectItem={(_sectionId, itemId) => setActiveItemId(itemId)}
        />
        <DisabilityInfoPanel content={content} />
      </div>
    </main>
  );
}

export default DisabilityInfoPage;
