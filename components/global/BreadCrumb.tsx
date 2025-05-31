import { ChevronRight, Home } from 'lucide-react'

interface IBreadCrumb {
  breadcrumbItems: {
    isHome?: boolean
    label: string
    onClick?: () => void
  }[]
}

export const BreadCrumb: React.FC<IBreadCrumb> = ({ breadcrumbItems }) => {
  return (
    <nav
      aria-label='Breadcrumb'
      className='flex items-center space-x-1 text-sm text-gray-600 mb-4'
    >
      {breadcrumbItems.map((item, index) => (
        <div key={index} className='flex items-center'>
          {index > 0 && <ChevronRight className='h-4 w-4 text-gray-400 mx-2' />}

          {item.onClick ? (
            <button
              onClick={item.onClick}
              className='flex items-center hover:text-blue-600 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 rounded px-2 py-1'
            >
              {item.isHome && <Home className='h-4 w-4 mr-1' />}
              {item.label}
            </button>
          ) : (
            <span className='flex items-center text-gray-900 font-medium px-2 py-1'>
              {item.isHome && <Home className='h-4 w-4 mr-1' />}
              {item.label}
            </span>
          )}
        </div>
      ))}
    </nav>
  )
}
