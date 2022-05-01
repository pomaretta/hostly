import React from 'react'
import { Disclosure } from '@headlessui/react'
import { MenuIcon, XIcon } from '@heroicons/react/outline'

import { Link } from 'react-router-dom';
import Context from '../../context/App';

import { classNames } from '../../utils/Utils';

class Navbar extends React.Component {

	render() {
		return (
			<Disclosure as="nav" className="sticky sm:relative bg-transparent h-20 w-full z-10">
				{({ open }) => (
					<>
						<div className="w-full px-2 sm:px-3 lg:px-5 | h-full | flex items-center">
							<div className="relative flex items-center justify-between | w-full h-full">
								<div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
									<h1 className='font-bold | text-4xl'>
										{
											this.props.title
										}
									</h1>
								</div>
								<div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0 | space-x-4">
									{/* Notifications */}
									<div className="dropdown dropdown-end">
										<button className="btn btn-ghost btn-circle">
											<div className="indicator">
												<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>
												<span className="badge badge-xs badge-primary indicator-item"></span>
											</div>
										</button>
										<ul tabindex="0" className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-80 | dark:bg-black dark:border-2 dark:border-blue-500">
											<li>
												<a className="justify-between">
													Hello to your new hostly account!
													<span className="badge | text-red-500">New</span>
												</a>
											</li>
										</ul>
									</div>
									{/* Profile */}
									<div className="dropdown dropdown-end">
										<label tabindex="0" className="btn btn-ghost btn-circle avatar | ring-2 ring-blue-300 ring-inset">
											<div className="w-10 rounded-full">
												<img src="https://api.lorem.space/image/face?hash=33791" />
											</div>
										</label>
										<ul tabindex="0" className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52 | dark:bg-black dark:border-2 dark:border-blue-500">
											<li><a className="justify-between">Profile</a></li>
											<li><a>Settings</a></li>
											<li><a className='text-red-500'>Logout</a></li>
										</ul>
									</div>
								</div>
							</div>
						</div>
					</>
				)}
			</Disclosure>
		)
	}

}

Navbar.contextType = Context;

export default Navbar;