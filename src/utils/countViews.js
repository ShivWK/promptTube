export default function countViews(view) {
    if (view > 1_000_000) {
      return (view / 1_000_000).toFixed(0) + "M";
    } else if (view > 1_000) {
      return (view / 1_000).toFixed(1) + "K";
    } else {
      return view;
    }
}