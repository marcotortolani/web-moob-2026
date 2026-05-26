import { cn } from '@/lib/utils'

interface ContainerProps extends React.HTMLAttributes<HTMLElement> {
  as?: 'div' | 'section' | 'main' | 'article' | 'header' | 'footer' | 'nav'
}

export function Container({ children, className, as: Tag = 'div', ...props }: ContainerProps) {
  return (
    <Tag
      className={cn('mx-auto w-full max-w-[1728px] px-5 md:px-8 lg:px-16 xl:px-24', className)}
      {...props}
    >
      {children}
    </Tag>
  )
}
