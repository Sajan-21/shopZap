import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { Link, useParams } from 'react-router-dom'
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChartSimple, faMoneyCheckDollar, faShoppingBag, faTableCells, faUserGroup, faUsers, faUserTie } from '@fortawesome/free-solid-svg-icons'

const navigation = [
  { name: 'Dashboard', icon : <FontAwesomeIcon icon={faTableCells} />, current: true, href: `/dashboard`},
  { name: 'Order status', icon : <FontAwesomeIcon icon={faChartSimple} />, current: false, href: '/orders'},
  { name: 'Products', icon: <FontAwesomeIcon icon={faShoppingBag} />, current: false, href: `/products`},
  { name: 'Customer', icon: <FontAwesomeIcon icon={faUsers} />, current: false, href: '/customers'},
  { name: 'Sellers', icon: <FontAwesomeIcon icon={faUserGroup} />, current: false, href: '/sellers'},
  { name: 'Staffs', icon: <FontAwesomeIcon icon={faUserTie} />, current: false, href: '/staffs'},
  { name: 'Financial status', icon: <FontAwesomeIcon icon={faMoneyCheckDollar} />, current: false, href: '/finance'},
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Navbar(props) {
  return (
    <Disclosure as="nav" className="bg-gray-800">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          <div className="absolute inset-y-0 left-0 flex items-center md:hidden">
            {/* Mobile menu button*/}
            <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:ring-2 focus:ring-white focus:outline-hidden focus:ring-inset">
              <span className="absolute -inset-0.5" />
              <span className="sr-only">Open main menu</span>
              <Bars3Icon aria-hidden="true" className="block size-6 group-data-open:hidden" />
              <XMarkIcon aria-hidden="true" className="hidden size-6 group-data-open:block" />
            </DisclosureButton>
          </div>
          <div className="flex flex-1 items-center justify-center sm:items-stretch md:justify-start">
            <div className="flex shrink-0 items-center logo-font text-white text-xl">shopZap
            </div>
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">

            {/* Profile dropdown */}
            <Menu as="div" className="relative ml-3">
              <div>
                <MenuButton className="relative flex rounded-full bg-gray-800 text-sm focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 focus:outline-hidden">
                  <span className="absolute -inset-1.5" />
                  <span className="sr-only">Open user menu</span>
                  <img
                    alt=""
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                    className="size-8 rounded-full"
                  />
                </MenuButton>
              </div>
              <MenuItems
                transition
                className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 ring-1 shadow-lg ring-black/5 transition focus:outline-hidden data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
              >
                <MenuItem>
                  <div
                    className="block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:outline-hidden cursor-pointer"
                  >
                    Update (password/email)
                  </div>
                </MenuItem>
                <MenuItem>
                  <div
                    className="block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:outline-hidden cursor-pointer"
                  >
                    Sign out
                  </div>
                </MenuItem>
              </MenuItems>
            </Menu>
          </div>
        </div>
      </div>

      <DisclosurePanel className="md:hidden">
        <div className="space-y-1 px-2 pt-2 pb-3">
          {navigation.map((item) => (
            <DisclosureButton
              key={item.name}
              as={Link}
              to={`${item.href}/${props.authId}`}
              aria-current={item.current ? 'page' : undefined}
              className='text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-base font-medium flex items-center gap-3'
              
            >
              {item.icon}{item.name}
            </DisclosureButton>
          ))}
        </div>
      </DisclosurePanel>
    </Disclosure>
  )
}
