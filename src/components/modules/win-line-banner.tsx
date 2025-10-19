export const WinLineBanner = () => {
  return (
    <div className="bg-gradient-to-r relative from-yellow-50 to-orange-50 dark:from-gray-900 dark:to-gray-800 rounded-lg p-6 md:p-8 flex items-center gap-6">
      <div className="relative flex-shrink-0">
        <img
          src="/images/master-games.png"
          alt="Master Africa"
          width={200}
          className="object-contain"
        />
      </div>

      <div className="flex-1 min-w-0">
        <h3 className="text-lg md:text-xl font-bold text-gray-900 dark:text-white mb-1 flex items-center gap-2">
          Win line 🎮 <span className="text-purple-600 dark:text-purple-400">Master Africa</span>
        </h3>
        <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400">
          This is the line up for outstanding game/challenge participation in Master Africa
        </p>
      </div>
    </div>
  );
};