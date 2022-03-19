import { GetServerSideProps } from 'next';
import { GetServerSidePropsContext } from 'next';

const CheckAuth = (f: any) => async (ctx: GetServerSidePropsContext) => {
    ctx.req.headers.authorization = `Bearer ${ctx.req.cookies.token}`;
    ctx.req.headers.accept = 'application/json';
    ctx.req.url =  process.env.BASEURL ?? 'http://localhost:8080';

    return await f(ctx);
}

export default CheckAuth;