/*
 * @Author: 武 旭东 wuxudong@zbnsec.com
 * @Date: 2023-06-13 08:42:30
 * @LastEditors: 武 旭东 wuxudong@zbnsec.com
 * @LastEditTime: 2023-06-13 08:43:49
 * @FilePath: \web-performance-opt\app\controller\admin.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { Controller, Context } from 'ves';
import { deserialize } from '@hubcarl/json-typescript-mapper';
import Article from '../model/article';
import Condition from '../lib/condition';

export default class AdminController extends Controller {

  public async login(ctx: Context) {
    await ctx.renderClient('admin/login.js', {});

  }

  public async home(ctx: Context) {
    await ctx.render('admin/home.js', { url: ctx.url.replace(/\/admin/, '') });
  }

  public async list(ctx: Context) {
    const condition = deserialize(Condition, ctx.request.body);
    ctx.body = await ctx.service.article.getArtilceList(condition);
  }

  public async add(ctx: Context) {
    const article = deserialize(Article, ctx.request.body);
    ctx.body = await ctx.service.article.saveArticle(article);
  }

  public async del(ctx: Context) {
    const { id  } = ctx.request.body;
    ctx.body = await ctx.service.article.deleteArticle(id);
  }

  public async detail(ctx: Context) {
    const { id } = ctx.params;
    ctx.body = await ctx.service.article.query({ id });
  }
}