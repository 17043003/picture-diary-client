import Link from 'next/link';

export type HeaderProps = {
  elements: navElement[];
};

export type navElement = {
  name: string;
  path: string;
};

const Header: React.FC<HeaderProps> = ({ elements }) => {
  const listElements = elements.map((e) => {
    return (
      <>
        <Link href={e.path}>
          <a className='w-full h-7 leading-7'>
            <li className='inline-block py-2 px-10 border-solid border-2 border-sky-100'>
              {e.name}
            </li>
          </a>
        </Link>
      </>
    );
  });
  return (
    <>
      <div className='w-full pt-3 shadow-[0_0_10px_1px_rgba(0,0,0,0.3)] bg-amber-100'>
        <h1 className='block w-1/4 h-14 mx-auto my-0 text-center font-bold text-4xl'>
          <Link href='/'>
            <a className='w-full h-full'>Picture Diary</a>
          </Link>
        </h1>
        <nav>
          <ul className='text-center'>{listElements}</ul>
        </nav>
      </div>
    </>
  );
};

export default Header;
