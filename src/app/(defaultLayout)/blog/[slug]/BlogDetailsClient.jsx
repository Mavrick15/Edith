"use client";
import Post from "@/app/ui/Post";
import Section from "@/app/ui/Section";
import BannerSectionStyle9 from "@/app/ui/Section/BannerSection/BannerSectionStyle9";
import Sidebar from "@/app/ui/Sidebar";
import Spacing from "@/app/ui/Spacing";
import AuthorWidget from "@/app/ui/Widget/AuthorWidget";
import CommentsWidget from "@/app/ui/Widget/CommentsWidget";
import ReplyWidget from "@/app/ui/Widget/ReplyWidget";
import { Icon } from "@iconify/react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { blogArticles, blogList } from "@/lib/blogData";
import bannerImg from "../../../../../public/images/doctors/banner_img_3.png";

const tags = [
  {
    tag: "Consultation gynécologique",
    href: "/blog/consultation-gynecologique",
  },
  { tag: "Infertilité", href: "/blog/infertilite-couple" },
  { tag: "PMA", href: "/blog/pma-fiv-kinshasa" },
  { tag: "Gynécologie obstétrique", href: "/blog/consultation-gynecologique" },
];

export default function BlogDetailsClient({ slug }) {
  const article = slug ? blogArticles[slug] : null;

  if (!article) {
    notFound();
  }

  const relatedBlog = blogList.filter((b) => b.slug !== slug);

  return (
    <>
      <Section topMd={170} bottomMd={54} bottomLg={54} />
      <div className="container">
        <div className="cs_blog_details_info">
          <div className="cs_blog_details_info_left">
            <div className="cs_blog_details_tags">
              {tags.map((item, index) => (
                <Link key={index} href={item.href}>
                  {item.tag}
                </Link>
              ))}
            </div>
            <div className="cs_blog_details_date">
              {article.date} 2025 | {article.author}
            </div>
          </div>
          <div className="cs_social_links_wrap">
            <h2>Partager :</h2>
            <div className="cs_social_links">
              <Link href="/">
                <Icon icon="fa-brands:facebook-f" />
              </Link>
              <Link href="/">
                <Icon icon="fa-brands:linkedin-in" />
              </Link>
              <Link href="/">
                <Icon icon="fa-brands:twitter" />
              </Link>
            </div>
          </div>
        </div>
        <Spacing md="55" />
        <Image
          src={article.thumbUrl}
          alt={article.title}
          className="w-100 cs_radius_20"
          width={1110}
          height={500}
          style={{ objectFit: "cover" }}
        />
        <Spacing md="90" lg="50" />
        <div className="row">
          <div className="col-lg-8">
            <div className="cs_blog_details">
              {article.sections.map((section, index) => {
                if (section.type === "h2") {
                  return <h2 key={index}>{section.text}</h2>;
                }
                if (section.type === "p") {
                  return <p key={index}>{section.text}</p>;
                }
                if (section.type === "blockquote") {
                  return (
                    <blockquote
                      key={index}
                      style={{
                        backgroundImage:
                          'url("/images/blog/blog_details_2.jpeg")',
                      }}
                    >
                      <p>{section.text}</p>
                    </blockquote>
                  );
                }
                return null;
              })}
            </div>
            <Spacing md="85" />
            <AuthorWidget
              imgUrl="/images/blog/author.png"
              name="À propos de l'auteur"
              description="Dr. Mboloko Esimo Justin est Professeur ordinaire de gynécologie-obstétrique, expert reconnu en fertilité et procréation médicalement assistée (PMA). Plus de 30 ans d'expérience au service de la santé reproductive à Kinshasa, RDC."
            />
            <Spacing md="110" />
            <CommentsWidget title="Commentaires" />
            <Spacing md="92" />
            <ReplyWidget title="Laisser un commentaire" />
          </div>
          <div className="col-lg-4">
            <Sidebar />
          </div>
        </div>
        <Spacing md="135" lg="100" />
        <h2 className="mb-0 cs_fs_40 cs_medium">Articles similaires</h2>
        <Spacing md="57" />
        <div className="row cs_gap_y_40">
          {relatedBlog?.map((item, index) => (
            <div className="col-xl-4 col-md-6" key={index}>
              <Post {...item} />
            </div>
          ))}
        </div>
      </div>
      <Spacing md="200" xl="150" lg="110" />
      <Section className="cs_footer_margin_0">
        <BannerSectionStyle9
          title="Ne négligez pas votre santé !"
          subTitle="Prenez rendez-vous dès aujourd'hui avec l'un de nos professionnels <br />de santé expérimentés !"
          imgUrl={bannerImg}
        />
      </Section>
    </>
  );
}
