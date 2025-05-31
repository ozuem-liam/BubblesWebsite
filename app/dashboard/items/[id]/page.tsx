import ProductDetailsPage from '@/components/sections/items/ItemDetails'
import dummy from '../../../../public/bubbles_store_mobile_img.jpeg'
export default function ItemDetailsPage() {
  return (
    <ProductDetailsPage
      product={{
        _id: '68342dc41322e8a463d4ccbd',
        name: 'Designer Formal',
        slug: 'designer-formal-5cs0ouyy',
        image: dummy, // string URL
        images: [dummy, dummy, dummy, dummy, dummy, dummy],
        category: '676956d0e9d0465abfd13a90',
        service: '682447e85443cc5efb54f9b4',
        vendor: '68342896772eadda93e76c0d',
        fixed_amount: 120000,
        express_amount: 250000,
        is_active: true,
        is_available: true,
        is_approved: false,
        is_deleted: false,
        is_featured: false,
        createdAt: '2025-05-26T09:00:52.950Z',
        updatedAt: '2025-05-26T09:00:52.950Z',
        __v: 0,
      }}
    />
  )
}
