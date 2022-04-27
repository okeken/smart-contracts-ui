import React, { FC, cloneElement, Children } from "react"
import Link, { LinkProps } from 'next/link'
import { useRouter } from "next/router"

interface ActiveLinkProps {
    activeClassName: string,
    href: string,
    as?: string
    [key: string]: any
    children: React.ReactElement
    // child: React.ReactNode
}

const ActiveLink = ({ children, activeClassName, ...props }:ActiveLinkProps) => {
    const { asPath } = useRouter()
    const child = Children.only(children)
    const childClassName = child.props.className || ''
  
    // pages/index.js will be matched via props.href
    // pages/about.js will be matched via props.href
    const className =
      asPath === props.href || asPath === props.as
        ? `${childClassName} ${activeClassName}`.trim()
        : childClassName
  
    return ( // @ts-ignore
      <Link {...props}>
        {cloneElement(child, {
          className: className || null,
        })}
      </Link>
    )
  }


  export default ActiveLink