import Link from "next/link";
import styles from "./landingPage.module.scss";
import { CiSearch, CiHeart } from "react-icons/ci";
import { MdFoodBank } from "react-icons/md";

export default function LandingPageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={styles.landingPage}>
      <div className={styles.topPanel}>
        <div className={styles.leftHalf}>
          <div
            className={`${styles.mainHeader} font-semibold flex items-center`}>
            <span className='mr-2'>{<MdFoodBank />}</span>Recipe-trier
          </div>
          <div>
            <Link href='/landingPage/myIngredients'>My ingredients</Link>
          </div>
          <div>My recipes</div>
          <div>Tips</div>
        </div>
        <div className={styles.rightHalf}>
          <Link href='/landingPage/searchRecipe'>
            <div className={styles.rightHalfIcons}>{<CiSearch />}</div>
          </Link>
          <Link href='/landingPage/wishlist'>
            <div className={styles.rightHalfIcons}>{<CiHeart />}</div>
          </Link>
          <Link href='./authentication/signIn'>
            <div>Sign in</div>
          </Link>
        </div>
      </div>
      <>{children}</>
    </div>
  );
}
